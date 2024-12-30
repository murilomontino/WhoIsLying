import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary, ButtonSecondary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'

const RevealByIdScreen = () => {
    const [visible, setVisible] = useState(false)
    const [player, setPlayer] = useState<Player | null>(null)
    const { players } = useAppSelector((state) => state.players)
    const { category } = useAppSelector((state) => state.categories)
    const router = useRouter()
    const { id } = useLocalSearchParams()
    // Animações com useSharedValue
    const opacity = useSharedValue(100) // FadeIn
    const flipX = useSharedValue(0) // Flip em X
    const pulseScale = useSharedValue(1) // Pulsar

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
        player?.revealPlayer()
        router.push('/reveal')
    }

    // Estilo para as animações
    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { rotateX: `${flipX.value}deg` }, // Aplica a rotação de Flip em X
                { scale: pulseScale.value }, // Animação de pulsar (scale)
            ],
        }
    })

    return (
        <DefaultLayout>
            <View className="flex flex-col items-center justify-center w-full h-full space-y-8">
                <Title />
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Animated.Text
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                        className="font-bold text-white text-7xl text-pretty"
                    >
                        {player?.name}
                    </Animated.Text>
                </View>
                <View className="flex items-center justify-center w-full px-8">
                    <Text
                        className="px-8 text-2xl text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#000', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        A Categoria é {category}
                    </Text>
                    <ButtonSecondary
                        disabled={visible}
                        onPress={handleSpinning}
                        className="w-full rounded-lg md:w-1/2 !opacity-100"
                    >
                        <Animated.Text
                            className="text-gray-800"
                            style={[
                                animatedStyles,
                                {
                                    fontFamily: 'Bangers_400Regular',
                                    fontSize: 42,
                                    textShadowColor: '#ef4444',
                                    textShadowOffset: { width: 2, height: 2 },
                                    textShadowRadius: 2,
                                },
                            ]}
                        >
                            {!visible ? 'Revelar' : 'Curupira'}
                        </Animated.Text>
                    </ButtonSecondary>
                </View>

                <Text
                    className="px-8 text-2xl text-center text-white"
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        textShadowColor: '#000', // Cor da borda
                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                    }}
                >
                    Cada Jogador, exceto o que está fora da Rodada, vai ver a mesma
                    comida secreta. Tente Fazer com que pareça óbvio que você sabe
                    qual é a comida secreta, mas sem revelar diretamente.
                </Text>
                <View className="flex items-center justify-center w-full px-8">
                    <ButtonPrimary
                        condition={visible}
                        onPress={handleReveal}
                        className="w-full rounded-lg md:w-1/2"
                    >
                        <Text
                            className="text-white"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#000', // Cor da borda
                                textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
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
