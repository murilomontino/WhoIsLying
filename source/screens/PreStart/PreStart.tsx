import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { Button } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import { useAppSelector } from '~/store/hooks'

const PreStartScreen = () => {
    const { category } = useAppSelector((state) => state.categories)
    return (
        <DefaultLayout>
            <Link href="/categories" asChild>
                <Button className="w-1/2">
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
                    textShadowColor: 'white', // Cor da borda
                    textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                    textShadowRadius: 2, // Raio para suavizar a sombra
                }}
            >
                {category}
            </Text>
        </DefaultLayout>
    )
}

export default PreStartScreen
