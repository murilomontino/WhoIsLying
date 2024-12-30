import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'

const RevealByIdScreen = () => {
    const [player, setPlayer] = useState<Player | null>(null)
    const { players } = useAppSelector((state) => state.players)
    const { category } = useAppSelector((state) => state.categories)
    const router = useRouter()
    const { id } = useLocalSearchParams()

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setPlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const handleReveal = () => {
        player?.revealPlayer()
        router.push('/reveal')
    }

    return (
        <DefaultLayout>
            <View className="flex flex-col items-center justify-center w-full h-full space-y-8">
                <Title />
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
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
                            Revelar
                        </Text>
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
                    comida secreta.
                </Text>
            </View>
        </DefaultLayout>
    )
}

export default RevealByIdScreen
