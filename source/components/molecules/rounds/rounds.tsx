import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
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
        <View className="flex-row items-center justify-between w-full bg-white rounded-full md:w-1/2 ">
            <Button
                disabled={rounds <= 1}
                className="p-2 my-2 bg-transparent border-r border-gray-600"
                onPress={handlePreviousRound}
            >
                <AntDesign
                    name="banckward"
                    size={24}
                    className="mr-2 text-gray-800"
                />
            </Button>
            <Text as="h5">
                {rounds} {rounds === 1 ? 'rodada' : 'rodadas'}
            </Text>
            <Button
                disabled={rounds >= 10}
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

export default Rounds
