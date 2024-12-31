import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import CoinFlip from '~/components/molecules/coin'
import { useAppSelector } from '~/store/hooks'

const ResultScreen = () => {
    const { players } = useAppSelector((state) => state.players)
    const { disguisedPlayer } = useAppSelector((state) => state.game)

    return (
        <DefaultLayout>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center w-full h-full space-y-8 justify-evenly"
            >
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text
                        className="text-4xl text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        Resultado da Votação
                    </Text>
                    <Text
                        className="text-3xl text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#181818', // Cor da borda
                            textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                            textShadowRadius: 1, // Raio para suavizar a sombra
                        }}
                    >
                        O(a) Mais votado(a) foi...
                    </Text>
                    <Text
                        className="text-3xl text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#181818', // Cor da borda
                            textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                            textShadowRadius: 1, // Raio para suavizar a sombra
                        }}
                    >
                        {
                            players.reduce((acc, player) => {
                                if (player.displayVotes > acc.displayVotes) {
                                    return player
                                }
                                return acc
                            }).name
                        }
                    </Text>
                </View>
                <View className="flex flex-col items-center justify-center w-full px-4 space-x-4 space-y-2">
                    <Text
                        className="text-3xl text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#181818', // Cor da borda
                            textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                            textShadowRadius: 1, // Raio para suavizar a sombra
                        }}
                    >
                        O Impostor é...
                    </Text>
                    <CoinFlip
                        initialWord="Ver Resultado"
                        finalWord={disguisedPlayer?.name}
                        words={players.map((player) => player.name)}
                    />
                </View>
                <Text
                    className="text-3xl text-center text-white"
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        textShadowColor: '#ef4444', // Cor da borda
                        textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                    }}
                >
                    Mostre esta tela para todos
                </Text>
            </Animated.View>
        </DefaultLayout>
    )
}

export default ResultScreen
