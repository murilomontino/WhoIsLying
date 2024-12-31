import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import Title from '~/components/atoms/title'
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
                    <Title />
                    <Text
                        className="text-6xl text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        Resultado da Votação
                    </Text>
                    <View className="flex flex-row items-center justify-center w-full px-4 space-x-4">
                        <CoinFlip
                            initialWord="Ver Resultado"
                            finalWord={disguisedPlayer?.name}
                            words={players.map((player) => player.name)}
                        />
                    </View>
                </View>
                <Text
                    className="text-center text-white"
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        fontSize: 42,
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
