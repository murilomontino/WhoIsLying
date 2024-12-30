import React from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import GoBack from '~/components/molecules/go-back'

const RevealScreen = () => {
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
                        Muca
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
                    {'?'}
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
                    <ButtonSecondary className="w-full rounded-lg md:w-1/2">
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
                            Eu sou o Muca
                        </Text>
                    </ButtonSecondary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RevealScreen
