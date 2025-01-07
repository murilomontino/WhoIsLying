import { AntDesign } from '@expo/vector-icons'
import classNames from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { BounceInLeft, BounceOutRight } from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangeRounds } from '~/store/slices/game/actions'

const Rounds = () => {
    const dispatch = useAppDispatch()
    const { rounds } = useAppSelector((state) => state.game)
    const { round } = useLocalSearchParams()

    const startingPlayer = round === '1'

    const handleNextRound = () => {
        dispatch(onChangeRounds({ rounds: rounds + 1 }))
    }

    const handlePreviousRound = () => {
        dispatch(onChangeRounds({ rounds: rounds - 1 }))
    }

    return (
        <View
            entering={BounceInLeft.duration(1000)}
            exiting={BounceOutRight.duration(1000)}
            className={classNames(
                {
                    'opacity-50 bg-gray-200': !startingPlayer,
                    'opacity-100 bg-white': startingPlayer,
                },
                'flex-row items-center justify-between w-full my-2 rounded-full md:w-1/2 ',
            )}
        >
            <Button
                disabled={rounds <= 1 || !startingPlayer}
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
                disabled={rounds >= 10 || !startingPlayer}
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
