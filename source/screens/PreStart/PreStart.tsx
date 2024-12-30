import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import Points from '~/components/molecules/points'
import Rounds from '~/components/molecules/rounds'
import { useAppSelector } from '~/store/hooks'

const PreStartScreen = () => {
    const { category } = useAppSelector((state) => state.categories)
    return (
        <DefaultLayout>
            <GoBack />
            <Title />
            <Text
                className="text-center text-gray-800"
                style={{
                    fontFamily: 'Bangers_400Regular',
                    fontSize: 42,
                    textShadowColor: '#ef4444', // Cor da borda
                    textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                    textShadowRadius: 2, // Raio para suavizar a sombra
                }}
            >
                {category}
            </Text>
            <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                <Text
                    className="w-full text-left text-gray-800 md:w-1/2"
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        fontSize: 20,
                        textShadowColor: '#ef4444', // Cor da borda
                        textShadowOffset: { width: 1, height: 1 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                    }}
                >
                    Condição de Vitória
                </Text>
                <Rounds />
                <Points />
            </View>

            <View className="flex flex-row items-center justify-center w-full px-4 space-x-4">
                <Link href="/reveal" asChild>
                    <ButtonPrimary className="w-full md:w-1/2">
                        <Text
                            className="text-white"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#ef4444', // Cor da borda
                                textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
                        >
                            Start Game
                        </Text>
                    </ButtonPrimary>
                </Link>
            </View>
        </DefaultLayout>
    )
}

export default PreStartScreen
