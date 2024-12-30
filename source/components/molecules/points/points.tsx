import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '~/components/atoms/button'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangePoints } from '~/store/slices/game/actions'

const Points = () => {
    const dispatch = useAppDispatch()
    const { points } = useAppSelector((state) => state.game)

    const handleNextRound = () => {
        dispatch(onChangePoints({ points: points + 50 }))
    }

    const handlePreviousRound = () => {
        dispatch(onChangePoints({ points: points - 50 }))
    }

    return (
        <View className="flex-row items-center justify-between w-full bg-white rounded-full md:w-1/2 ">
            <Button
                disabled={points <= 50}
                className="p-2 my-2 bg-transparent border-r border-gray-600"
                onPress={handlePreviousRound}
            >
                <AntDesign
                    name="banckward"
                    size={24}
                    className="mr-2 text-gray-800"
                />
            </Button>
            <Text
                className="text-3xl font-semibold text-gray-800 uppercase"
                style={{
                    fontFamily: 'Bangers_400Regular',
                    textShadowColor: '#ef4444', // Cor da borda
                    textShadowOffset: { width: 1, height: 1 }, // Offset da sombra
                    textShadowRadius: 2, // Raio para suavizar a sombra
                }}
            >
                {points} pontos
            </Text>
            <Button
                disabled={points >= 9999}
                className="p-2 my-2 bg-transparent border-l border-gray-600"
                onPress={handleNextRound}
            >
                <AntDesign
                    name="forward"
                    size={24}
                    className="ml-2 text-gray-800"
                />
            </Button>
        </View>
    )
}

export default Points
