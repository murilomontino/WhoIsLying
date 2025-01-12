import { AntDesign } from '@expo/vector-icons'
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
import Difficulty from '~/components/molecules/difficulty'
import GoBack from '~/components/molecules/go-back'
import Points from '~/components/molecules/points'
import Rounds from '~/components/molecules/rounds'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onChangeQuestionRound,
    onGenerateDisguised,
    onGenerateItem,
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
        dispatch(onChangeQuestionRound({ questionRound: Number(1) }))
        dispatch(onGenerateDisguised())
        dispatch(onGenerateItem())
        await delay(100)
        router.push('/reveal')
    }

    return (
        <DefaultLayout>
            <GoBack href="/" />
            <View className="items-center flex-1">
                <Title />
                <Text
                    entering={FlipInEasyX.duration(500)}
                    exiting={FlipOutEasyX.duration(500)}
                    as="h2"
                    className="text-center !text-gray-800 text-shadow-outlined-red"
                >
                    {category}
                </Text>
            </View>
            <View className="flex flex-col items-center justify-center flex-1 w-full px-2">
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
            <View className="flex flex-col items-center justify-center flex-1 w-full px-2">
                <Text
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                    className="w-full text-left text-gray-800 md:w-1/2"
                >
                    Opções de Jogo
                </Text>
                <Difficulty />
            </View>

            <View
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center flex-[0.5] w-full px-4 space-x-4"
            >
                <ButtonPrimary className="w-full" onPress={handleStartGame}>
                    <Text as="h3" className="!text-white text-shadow-outlined-red">
                        Start Game
                        {'  '}
                        <AntDesign name="play" size={24} />
                    </Text>
                </ButtonPrimary>
            </View>
        </DefaultLayout>
    )
}

export default PreStartScreen
