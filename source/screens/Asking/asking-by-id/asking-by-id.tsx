import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onUpdatePlayerCanAnswer,
    onUpdatePlayerCanAsk,
} from '~/store/slices/players/actions'
import type { Player } from '~/store/slices/players/player'
import cache from '~/utils/cache'
import { drawPlayer } from '~/utils/drawPlayer'

const AskingById = () => {
    const { id } = useLocalSearchParams()
    const [askPlayer, setAskPlayer] = useState<typeof Player | null>(null)
    const [answerPlayer, setAnswerPlayer] = useState<typeof Player | null>(null)
    const dispatch = useAppDispatch()
    const { players } = useAppSelector((state) => state.players)
    const { questionRound } = useAppSelector((state) => state.game)
    const router = useRouter()

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setAskPlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const getAnswerPlayer = async () => {
        const cachedAnswerPlayer = await cache.get(
            `${questionRound}-answerPlayer-${askPlayer?._id}`,
        )

        if (cachedAnswerPlayer) {
            const player = players.find((p) => p._id === cachedAnswerPlayer)

            if (!player) {
                throw new Error('Jogador não encontrado')
            }

            setAnswerPlayer(player)
            return
        }

        const canPlayersAnswer = players.filter(
            (player) => player.canAnswer && player._id !== askPlayer?._id,
        )

        if (canPlayersAnswer.length === 1) {
            // aleatoriamente sorteia um jogador para responder
            setAnswerPlayer(canPlayersAnswer[0])
            return
        }

        if (canPlayersAnswer.length === 0) {
            setAnswerPlayer(null)
            router.push('/round-table')
            return
        }

        let answerPlayer = null

        while (answerPlayer === null) {
            if (canPlayersAnswer.length === 0) {
                break
            }
            const player = drawPlayer(canPlayersAnswer)
            if (player?._id === askPlayer?._id) {
                continue
            }
            answerPlayer = player
        }

        setAnswerPlayer(answerPlayer)

        await cache.set(
            `${questionRound}-answerPlayer-${askPlayer?._id}`,
            answerPlayer?._id as string,
        )
    }

    useEffect(() => {
        if (askPlayer) {
            getAnswerPlayer()
        }
    }, [askPlayer?._id])

    const handleNext = () => {
        setAskPlayer(null)
        dispatch(
            onUpdatePlayerCanAsk({
                _id: askPlayer?._id as string,
                canAsk: false,
            }),
        )
        dispatch(
            onUpdatePlayerCanAnswer({
                _id: answerPlayer?._id as string,
                canAnswer: false,
            }),
        )

        const player = players.find((p) => p.canAsk && p._id !== askPlayer?._id)

        if (!player) {
            return router.push('/round-table')
        }

        router.push(`/asking/${player._id}`)
        return
    }

    return (
        <DefaultLayout>
            <GoBack />
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
                        {answerPlayer?.name}
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
                        {askPlayer?.name}
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

export default AskingById
