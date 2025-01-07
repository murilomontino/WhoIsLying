import { AntDesign } from '@expo/vector-icons'
import classNames from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { BounceInRight, BounceOutLeft } from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangePoints } from '~/store/slices/game/actions'

const Points = () => {
    const dispatch = useAppDispatch()
    const { points } = useAppSelector((state) => state.game)
    const { round } = useLocalSearchParams()

    const startingPlayer = round === '1'

    const handleNextRound = () => {
        dispatch(onChangePoints({ points: points + 50 }))
    }

    const handlePreviousRound = () => {
        dispatch(onChangePoints({ points: points - 50 }))
    }

    return (
        <View
            entering={BounceInRight.duration(1000)}
            exiting={BounceOutLeft.duration(1000)}
            className={classNames(
                {
                    'opacity-50 bg-gray-200': !startingPlayer,
                    'opacity-100 bg-white': startingPlayer,
                },
                'flex-row items-center justify-between my-2 w-full rounded-full md:w-1/2 ',
            )}
        >
            <Button
                disabled={points <= 50 || !startingPlayer}
                className="p-2 my-2 bg-transparent border-r border-gray-600"
                onPress={handlePreviousRound}
            >
                <AntDesign
                    name="banckward"
                    size={24}
                    className="mr-2 text-gray-800"
                />
            </Button>
            <Text as="h5">{points} pontos</Text>
            <Button
                disabled={points >= 9999 || !startingPlayer}
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
