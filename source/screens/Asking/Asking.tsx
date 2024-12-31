import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onAnsweredTheQuestion,
    onUpdatePlayerCanAsk,
} from '~/store/slices/players/actions'
import cache from '~/utils/cache'
import { delay } from '~/utils/delay'
import { drawPlayerWithConditions } from '~/utils/drawPlayer'

const AskingScreen = () => {
    const { n, ask_id, answer_id } = useLocalSearchParams()

    const dispatch = useAppDispatch()
    const { players } = useAppSelector((state) => state.players)

    const askPlayer = useMemo(
        () => players.find((p) => p._id === ask_id),
        [ask_id, players],
    )

    const answerPlayer = useMemo(
        () => players.find((p) => p._id === answer_id),
        [answer_id, players],
    )

    const { questionRound } = useAppSelector((state) => state.game)
    const router = useRouter()

    const handleSubmit = useCallback(async () => {
        await dispatch(
            onUpdatePlayerCanAsk({
                _id: ask_id as string,
                canAsk: false,
            }),
        )

        await dispatch(
            onAnsweredTheQuestion({
                _id: answer_id as string,
                player_ask_id: ask_id as string,
            }),
        )
    }, [ask_id, answer_id])

    const handleNext = useCallback(async () => {
        const nextRouteCache = await cache.get(`asking-${n}`)
        if (nextRouteCache) {
            return router.push(nextRouteCache)
        }

        await handleSubmit()

        await delay(100)

        const indexActual = players.findIndex(
            (player) => player._id === (ask_id as string),
        )

        const nextIndex = indexActual + 1

        if (nextIndex === players.length) {
            return router.push('/round-table')
        }

        const nextPlayerAsk = players[nextIndex]

        const nextAnswerPlayer = await drawPlayerWithConditions(
            players,
            (player) => {
                return (
                    player.canAnswer &&
                    player._id !== nextPlayerAsk._id &&
                    !player.blackListQuestioners.includes(nextPlayerAsk._id)
                )
            },
        )

        const route = `/asking/${Number(n) + 1}/${nextPlayerAsk?._id}/${nextAnswerPlayer._id}`
        await cache.set(`asking-${Number(n)}`, route)

        return router.push(route)
    }, [ask_id, n, players, router])

    return (
        <DefaultLayout>
            <GoBack condition={Number(n) !== 1} />
            <View
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center justify-center w-full h-[85vh] space-y-8"
            >
                <View className="flex flex-col items-center justify-center w-full px-2 mb-10 space-y-4">
                    <Text as="body" className="!text-white text-shadow-outlined">
                        {questionRound} Rodada
                    </Text>
                    <Text as="h2" className="!text-white text-shadow-outlined-red">
                        {askPlayer?.name}
                    </Text>
                    <Text
                        className="text-center !text-white text-shadow-outlined"
                        as="h3"
                    >
                        Pergunta Para
                    </Text>
                    <Text
                        as="h1"
                        className="!text-gray-800 text-shadow-outlined-red"
                    >
                        {answerPlayer?.name}
                    </Text>
                </View>
                <View className="h-20">
                    <Text
                        style={{
                            fontSize: 128,
                            transform: [{ rotate: '35deg' }],
                        }}
                    >
                        🍔
                    </Text>
                </View>

                <View className="flex items-center justify-center w-full px-8">
                    <ButtonSecondary
                        onPress={handleNext}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text as="h2">Próximo</Text>
                    </ButtonSecondary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default AskingScreen
