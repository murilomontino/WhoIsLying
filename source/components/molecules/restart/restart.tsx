import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import withControl, { type ControlProps } from '~/components/helpers/with-control'
import Text from '~/components/ui/text'
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
                className="px-4 m-2 bg-red-400 rounded-full md:m-4 w-fit md:pb-0"
            >
                <Text className="gap-2 text-lg text-white">
                    <AntDesign name="sync" size={20} className="text-white " /> Novo
                    Jogo
                </Text>
            </Button>
        </View>
    )
}

export default withControl(Restart)
