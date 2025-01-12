import { AntDesign } from '@expo/vector-icons'
import classNames from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { BounceInRight, BounceOutLeft } from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangeDifficulty } from '~/store/slices/game/actions'

const popularity = {
    0: 'Todos conhecem',
    1: 'Muitos conhecem',
    2: 'Alguns conhecem',
    3: 'Poucos conhecem',
    4: 'Quase ninguém conhece',
    5: 'Ninguém conhece',
} as const

const Difficulty = () => {
    const dispatch = useAppDispatch()
    const { difficulty } = useAppSelector((state) => state.game)
    const { round } = useLocalSearchParams()

    const startingPlayer = round === '1'

    const handleNextRound = () => {
        dispatch(onChangeDifficulty({ difficulty: difficulty + 1 }))
    }

    const handlePreviousRound = () => {
        dispatch(onChangeDifficulty({ difficulty: difficulty - 1 }))
    }

    return (
        <View className="w-full md:w-1/2">
            <View
                entering={BounceInRight.duration(1000)}
                exiting={BounceOutLeft.duration(1000)}
                className={classNames(
                    {
                        'opacity-50 bg-gray-200': !startingPlayer,
                        'opacity-100 bg-white': startingPlayer,
                    },
                    'flex-row items-center justify-between my-2 w-full rounded-full  ',
                )}
            >
                <Button
                    disabled={difficulty <= 0 || !startingPlayer}
                    className="p-2 my-2 bg-transparent border-r border-gray-600"
                    onPress={handlePreviousRound}
                >
                    <AntDesign
                        name="banckward"
                        size={24}
                        className="mr-2 text-gray-800"
                    />
                </Button>
                <Text as="h5">{popularity[difficulty]}</Text>
                <Button
                    disabled={difficulty >= 5 || !startingPlayer}
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
            <View className="flex-row justify-between">
                <Text as="overline">Mais Popular</Text>
                <Text as="overline">Menos Popular</Text>
            </View>
        </View>
    )
}

export default Difficulty
