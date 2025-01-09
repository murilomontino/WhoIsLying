import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Easing,
    FadeInLeft,
    FadeInRight,
    FadeOutLeft,
    FadeOutRight,
    FlipInEasyX,
    FlipOutEasyX,
    useAnimatedStyle,
    useSharedValue,
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
import { delay } from '~/utils/delay'

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
    const translateX = useSharedValue(0) // Translate em X

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setPlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const handleReveal = useCallback(async () => {
        // Inicia a animação de saída
        opacity.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
        })
        translateX.value = withTiming(-100, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
        })
        await delay(1000) // Aguarda a animação de saída

        // Após a animação, atualiza o estado do jogador e redireciona
        dispatch(
            onUpdatePlayerReveal({
                _id: player?._id as string,
                reveal: true,
            }),
        )
        router.push('/reveal')
    }, [player])

    const animatedViewStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value }, // Animação de saída
            ],
        }
    })

    const handlePressReveal = useCallback(() => {
        setVisible(true)
    }, [])

    const item = useMemo(() => {
        if (id === disguisedPlayer?._id) {
            return 'Você é o Impostor'
        }
        return 'Cartoon'
    }, [visible, id, disguisedPlayer])

    return (
        <DefaultLayout>
            <View
                style={[animatedViewStyles]}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
                <View className="flex flex-col items-center justify-center flex-1 w-full px-2 space-y-4">
                    <Title />
                    <Text
                        entering={FadeInLeft}
                        exiting={FadeOutRight}
                        as="h2"
                        className="!text-white text-shadow-outlined-red"
                    >
                        {player?.name}
                    </Text>
                </View>
                <View className="flex items-center justify-center flex-1 w-full px-8">
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
                            onPress={handlePressReveal}
                            className="rounded-lg !opacity-100 h-24 md:w-[50vw] w-full "
                        >
                            <Text disabled={visible} as="h4">
                                <Text
                                    entering={FadeInRight}
                                    exiting={FlipOutEasyX.duration(500)}
                                    demount={visible}
                                    as="h4"
                                    className="text-red-500"
                                >
                                    Revelar
                                </Text>
                                <Text
                                    condition={visible}
                                    delay={500}
                                    entering={FlipInEasyX.duration(1000)}
                                    exiting={FlipOutEasyX}
                                    as="h4"
                                    className="text-white"
                                >
                                    {item}
                                </Text>
                            </Text>
                        </ButtonSecondary>
                    </View>
                </View>
                <Text
                    entering={FadeInRight}
                    exiting={FadeOutRight}
                    as="body"
                    className="w-full text-wrap px-8 text-center !text-white md:w-1/2 text-shadow-sm"
                >
                    Cada Jogador, exceto o que está fora da Rodada, vai ver a mesma
                    comida secreta. Tente Fazer com que pareça óbvio que você sabe
                    qual é a comida secreta, mas sem revelar diretamente.
                </Text>
                <View
                    condition={visible}
                    entering={FadeInLeft}
                    exiting={FadeOutRight}
                    className="flex flex-[0.5] items-center justify-center w-full px-8"
                >
                    <ButtonPrimary
                        disabled={!visible}
                        onPress={handleReveal}
                        className="w-full rounded-full"
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
