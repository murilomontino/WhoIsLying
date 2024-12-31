import { useRouter } from 'expo-router'
import React from 'react'
import {
    BounceIn,
    BounceOut,
    FadeIn,
    FadeOut,
    FlipInEasyX,
    FlipOutEasyX,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import Points from '~/components/molecules/points'
import Rounds from '~/components/molecules/rounds'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onChangeQuestionRound,
    onGenerateDisguised,
} from '~/store/slices/game/actions'
import { onResetPlayers } from '~/store/slices/players/actions'
import cache from '~/utils/cache'
import { delay } from '~/utils/delay'

const PreStartScreen = () => {
    const { category } = useAppSelector((state) => state.categories)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleStartGame = async () => {
        cache.clearAll()
        dispatch(onResetPlayers())
        dispatch(onChangeQuestionRound({ questionRound: 1 }))
        dispatch(onGenerateDisguised())
        await delay(100)
        router.push('/reveal')
    }

    return (
        <DefaultLayout>
            <GoBack />
            <Title />
            <Text
                entering={FlipInEasyX.duration(500)}
                exiting={FlipOutEasyX.duration(500)}
                as="h2"
                className="text-center !text-gray-800 text-shadow-outlined-red"
            >
                {category}
            </Text>
            <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                <Text
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                    className="w-full text-left text-gray-800 md:w-1/2"
                >
                    Condição de Vitória
                </Text>
                <Rounds />
                <Points />
            </View>

            <View
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <ButtonPrimary
                    className="w-full md:w-1/2"
                    onPress={handleStartGame}
                >
                    <Text as="h3" className="!text-white text-shadow-outlined-red">
                        Start Game
                    </Text>
                </ButtonPrimary>
            </View>
        </DefaultLayout>
    )
}

export default PreStartScreen
