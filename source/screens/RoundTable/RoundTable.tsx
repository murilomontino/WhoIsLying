import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary, ButtonSecondary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onNewQuestionRound, onResetVoting } from '~/store/slices/players/actions'

import { AntDesign } from '@expo/vector-icons'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
import { onChangeQuestionRound } from '~/store/slices/game/actions'
import cache from '~/utils/cache'
import { delay } from '~/utils/delay'
import { drawPlayerWithConditions } from '~/utils/drawPlayer'

const RoundTableScreen = () => {
    const { players } = useAppSelector((state) => state.players)
    const { questionRound } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handlePressWeAreReady = () => {
        dispatch(onResetVoting())
        router.push('/voting')
    }

    const handleNextRound = useCallback(async () => {
        const answerPlayer = await drawPlayerWithConditions(
            players,
            (player) => player._id !== players[0]._id,
        )

        router.push(`/asking/1/${players[0]._id}/${answerPlayer._id}`)
    }, [players])

    const handlePressAnotherRound = useCallback(async () => {
        await cache.clearAll()
        dispatch(onNewQuestionRound())
        dispatch(onChangeQuestionRound({ questionRound: questionRound + 1 }))
        await delay(100)
        await handleNextRound()
    }, [players, questionRound])

    return (
        <DefaultLayout>
            <GoBack href="/" />
            <View className="flex flex-col items-center justify-center w-full h-full space-y-8">
                <Title />
                <View className="flex items-center justify-center flex-1 w-full gap-4 px-4">
                    <ButtonSecondary
                        className="flex flex-col items-center justify-center w-[75vw] text-center "
                        onPress={handlePressAnotherRound}
                    >
                        <View className="flex flex-row items-center justify-center w-full">
                            <AntDesign
                                name="pluscircleo"
                                size={24}
                                className="text-gray-800 "
                            />
                            <Text className="ml-2 text-3xl text-gray-800 ">
                                Mais uma Rodada
                            </Text>
                        </View>
                    </ButtonSecondary>
                    <ButtonPrimary
                        className="flex flex-col items-center justify-center w-[75vw] text-center "
                        onPress={handlePressWeAreReady}
                    >
                        <Text className="text-3xl text-white">Estamos Prontos</Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RoundTableScreen
