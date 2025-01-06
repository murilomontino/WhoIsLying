import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import withControl, { type ControlProps } from '~/components/helpers/with-control'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangePlayRound, onResetGame } from '~/store/slices/game/actions'
import { onResetScore } from '~/store/slices/players/actions'
import cache from '~/utils/cache'

const Restart = ({ ...props }: ControlProps) => {
    const dispatch = useAppDispatch()
    const { round } = useAppSelector((state) => state.game)

    const handleRestart = () => {
        cache.clearAll()
        dispatch(onChangePlayRound({ round: 1 }))
        dispatch(onResetGame())
        dispatch(onResetScore())
    }

    return (
        <View
            {...props}
            condition={round > 1}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            className="absolute top-0 right-0 z-50 rounded-full w-fit"
        >
            <Button
                onPress={handleRestart}
                className="px-4 m-4 bg-red-500 rounded-full w-fit"
            >
                <Text className="gap-2 space-x-2 text-white" as="body">
                    <AntDesign name="sync" size={24} className="mr-2 text-white" />
                    Novo Jogo
                </Text>
            </Button>
        </View>
    )
}

export default withControl(Restart)
