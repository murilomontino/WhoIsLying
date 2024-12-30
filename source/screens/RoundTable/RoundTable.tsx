import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary, ButtonSecondary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'

const RoundTableScreen = () => {
    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-full space-y-8">
                <Title />
                <View className="flex items-center justify-center w-full px-8 space-y-4">
                    <ButtonSecondary
                        onPress={() => {}}
                        className="flex flex-row w-full space-x-2 rounded-full md:w-1/2"
                    >
                        <AntDesign
                            name="pluscircleo"
                            size={42}
                            className="text-gray-800 "
                        />
                        <Text
                            className="text-gray-800"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#ef4444', // Cor da borda
                                textShadowOffset: { width: 1, height: 1 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
                        >
                            Mais uma Rodada
                        </Text>
                    </ButtonSecondary>
                    <ButtonPrimary
                        onPress={() => {}}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text
                            className="text-white"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#ef4444', // Cor da borda
                                textShadowOffset: { width: 1, height: 1 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
                        >
                            Estamos Prontos
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RoundTableScreen
