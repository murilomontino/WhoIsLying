import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import { Button } from '~/components/atoms/button'

const GoBack = () => {
    const router = useRouter()

    const goBack = () => {
        if (router.canGoBack()) {
            router.back()
        }
    }

    return (
        <Button
            onPress={goBack}
            className="absolute top-0 left-0 px-4 m-4 bg-red-500 rounded-full w-fit"
        >
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
                <AntDesign name="back" size={24} className="mr-2 text-white" />
                Voltar
            </Text>
        </Button>
    )
}

export default GoBack
