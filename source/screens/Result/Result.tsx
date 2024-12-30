import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'

const ResultScreen = () => {
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
                </View>
            </Animated.View>
        </DefaultLayout>
    )
}

export default ResultScreen
