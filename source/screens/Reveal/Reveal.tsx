import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import GoBack from '~/components/molecules/go-back'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'

const RevealScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        const currentPlayer = players.find((player) => !player.reveal)
        if (!currentPlayer) {
            router.push('/asking')
            return
        }
        setPlayer(currentPlayer)
    }, [players, player?.reveal])

    const handleReveal = () => {
        router.navigate(`/reveal/${player?._id}`)
    }

    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-full space-y-8">
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
                <Text
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        textShadowColor: '#ef4444', // Cor da borda
                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                        fontSize: 200,
                        transform: [{ rotate: '35deg' }],
                    }}
                    className="text-center text-white"
                >
                    {player?.reveal ? '🍔' : '🤫'}
                </Text>

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
            </View>
        </DefaultLayout>
    )
}

export default RevealScreen
