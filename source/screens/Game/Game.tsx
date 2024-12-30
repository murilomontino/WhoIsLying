import { AntDesign } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { Button } from '~/components/atoms/button'

const GameScreen = () => {
    return (
        <DefaultLayout>
            <Link href="/" asChild>
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
        </DefaultLayout>
    )
}

export default GameScreen
