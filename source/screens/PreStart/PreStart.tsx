import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { Button, ButtonPrimary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import Points from '~/components/molecules/points'
import Rounds from '~/components/molecules/rounds'
import { useAppSelector } from '~/store/hooks'

const PreStartScreen = () => {
    const { category } = useAppSelector((state) => state.categories)
    return (
        <DefaultLayout>
            <Link href="/categories" asChild>
                <Button className="absolute top-0 left-0 px-4 m-4 bg-red-500 rounded-full w-fit">
                    <Text
                        className="gap-2 space-x-2 text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 24,
                            textShadowColor: 'black', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        <AntDesign
                            name="back"
                            size={24}
                            className="mr-2 text-white"
                        />
                        Voltar
                    </Text>
                </Button>
            </Link>
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
                <Link href="/categories" asChild>
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
