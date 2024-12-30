import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'

const WaitPlayerScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()
    const { players } = useAppSelector((state) => state.players)
    const { id } = useLocalSearchParams()

    useEffect(() => {
        if (!isMounted) return
        const player = players.find((p) => p._id === id)
        if (player) {
            setPlayer(player)
        } else {
            router.push('/game-over')
        }
    }, [id, isMounted])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleReveal = () => {
        router.navigate(`/voting/${player?._id}`)
    }

    return (
        <DefaultLayout>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text
                        className="text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 42,
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        Passe para o(a){' '}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                        className="font-bold text-white text-7xl text-pretty"
                    >
                        {player?.name}
                    </Text>
                </View>

                <View className="flex items-center justify-center w-full px-8">
                    <ButtonSecondary
                        onPress={handleReveal}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text
                            className="text-gray-800"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#ef4444', // Cor da borda
                                textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
                        >
                            Eu sou o(a) {player?.name}
                        </Text>
                    </ButtonSecondary>
                </View>
            </Animated.View>
        </DefaultLayout>
    )
}

export default WaitPlayerScreen
