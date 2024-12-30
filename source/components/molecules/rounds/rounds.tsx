import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '~/components/atoms/button'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangeRounds } from '~/store/slices/game/actions'

const Rounds = () => {
    const dispatch = useAppDispatch()
    const { rounds } = useAppSelector((state) => state.game)

    const handleNextRound = () => {
        dispatch(onChangeRounds({ rounds: rounds + 1 }))
    }

    const handlePreviousRound = () => {
        dispatch(onChangeRounds({ rounds: rounds - 1 }))
    }

    return (
        <View className="flex-row items-center justify-between w-1/2 bg-white rounded-full ">
            <Button
                className="p-2 my-2 border-r border-gray-600"
                onPress={handlePreviousRound}
            >
                <AntDesign
                    name="banckward"
                    size={24}
                    className="mr-2 text-gray-800"
                />
            </Button>
            <Text>Rodada 1</Text>
            <Button
                className="p-2 my-2 border-l border-gray-600"
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

export default Rounds
