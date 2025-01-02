import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Easing,
    FadeInLeft,
    FadeInRight,
    FadeOutLeft,
    FadeOutRight,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary, ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onUpdatePlayerReveal } from '~/store/slices/players/actions'
import type { Player } from '~/store/slices/players/player'

const RevealByIdScreen = () => {
    const [visible, setVisible] = useState(false)
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const { players } = useAppSelector((state) => state.players)
    const { category } = useAppSelector((state) => state.categories)
    const { disguisedPlayer } = useAppSelector((state) => state.game)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { id } = useLocalSearchParams()
    // Animações com useSharedValue
    const opacity = useSharedValue(100) // FadeIn
    const flipX = useSharedValue(0) // Flip em X
    const pulseScale = useSharedValue(1) // Pulsar
    const translateX = useSharedValue(0) // Translate em X

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setPlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const handleSpinning = () => {
        // Configura Flip em X
        flipX.value = withRepeat(
            withTiming(100, { duration: 150, easing: Easing.ease }), // Flip em X com duração de 1 segundo
            4,
        )

        // Inicia animação de Pulsar e Fade
        pulseScale.value = withRepeat(
            withTiming(1.2, { duration: 500, easing: Easing.ease }), // Aumenta a escala para 1.2
            -1, // Número de repetições (-1 significa infinito)
            true, // Inverte a animação, fazendo pulsar para frente e para trás
        )

        // Anima Fade (opacidade) alternando entre 1 e 0
        opacity.value = withRepeat(
            withTiming(0.5, { duration: 500, easing: Easing.ease }), // diminui para 0.8
            -1, // Número de repetições (-1 significa infinito)
            true, // Inverte o efeito de fade
        )

        setTimeout(() => {
            setVisible(true)
            flipX.value = withTiming(0, { duration: 150, easing: Easing.ease }) // Reseta a rotação de Flip
            pulseScale.value = withTiming(1, { duration: 500, easing: Easing.ease }) // Reseta a animação de Pulsar
            opacity.value = withTiming(1, { duration: 1000 }) // Reseta a animação de Fade
        }, 1000) // Atraso após a animação de Flip
    }

    const handleReveal = () => {
        // Inicia a animação de saída
        opacity.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
        })
        translateX.value = withTiming(
            -100,
            { duration: 1000, easing: Easing.out(Easing.quad) },
            () => {
                // Após a animação, atualiza o estado do jogador e redireciona
                dispatch(
                    onUpdatePlayerReveal({
                        _id: player?._id as string,
                        reveal: true,
                    }),
                )
                router.push('/reveal')
            },
        )
    }

    // Estilo para as animações
    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { rotateX: `${flipX.value}deg` }, // Aplica a rotação de Flip em X
                { scale: pulseScale.value }, // Animação de pulsar (scale)
                { translateX: translateX.value }, // Animação de saída
            ],
        }
    })

    const animatedViewStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value }, // Animação de saída
            ],
        }
    })

    const item = useMemo(() => {
        if (!visible) return 'Revelar'
        if (id === disguisedPlayer?._id) {
            return 'Você é o Impostor'
        }
        return 'Curupira'
    }, [visible, id, disguisedPlayer])

    return (
        <DefaultLayout>
            <View
                style={[animatedViewStyles]}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
                <Title />
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text
                        entering={FadeInLeft}
                        exiting={FadeOutRight}
                        as="h2"
                        className="!text-white text-shadow-outlined-red"
                    >
                        {player?.name}
                    </Text>
                </View>
                <View className="flex items-center justify-center w-full px-8">
                    <Text
                        entering={FadeInLeft}
                        exiting={FadeOutRight}
                        as="h3"
                        className="!text-white text-shadow-outlined-red"
                    >
                        A Categoria é{' '}
                        <Text entering={FadeInRight} exiting={FadeOutLeft} as="h3">
                            {category}
                        </Text>
                    </Text>
                    <View
                        entering={FadeInRight}
                        exiting={FadeOutRight}
                        className="flex items-center justify-center w-full"
                    >
                        <ButtonSecondary
                            disabled={visible}
                            onPress={handleSpinning}
                            className="rounded-lg !opacity-100 h-24 w-[50vw] max-w-[300px]"
                        >
                            <Text
                                className="text-gray-800"
                                as="h4"
                                style={[animatedStyles]}
                            >
                                {item}
                            </Text>
                        </ButtonSecondary>
                    </View>
                </View>

                <Text
                    entering={FadeInRight}
                    exiting={FadeOutRight}
                    as="body"
                    className="w-full px-8 text-center !text-white md:w-1/2 text-shadow-sm"
                >
                    Cada Jogador, exceto o que está fora da Rodada, vai ver a mesma
                    comida secreta. Tente Fazer com que pareça óbvio que você sabe
                    qual é a comida secreta, mas sem revelar diretamente.
                </Text>
                <View
                    condition={visible}
                    entering={FadeInLeft}
                    exiting={FadeOutRight}
                    className="flex items-center justify-center w-full px-8"
                >
                    <ButtonPrimary
                        disabled={!visible}
                        onPress={handleReveal}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text
                            className="!text-white text-shadow-outlined-red"
                            as="h3"
                        >
                            Entendido
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RevealByIdScreen
