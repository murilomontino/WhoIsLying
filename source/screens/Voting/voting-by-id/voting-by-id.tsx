import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onVoteInPlayer } from '~/store/slices/players/actions'
import type { Player } from '~/store/slices/players/player'

const Voting = () => {
    const { id } = useLocalSearchParams()
    const [votePlayer, setVotePlayer] = useState<typeof Player | null>(null)
    const dispatch = useAppDispatch()
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    const possiblePlayers = players.filter((p) => p._id !== id)

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setVotePlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const handleNext = (disguised_id: string) => {
        dispatch(
            onVoteInPlayer({
                disguised_id,
                _id: votePlayer?._id as string,
            }),
        )

        const player = players.find((p) => p.canVote && p._id !== votePlayer?._id)

        if (!player) {
            return router.push('/pre-result')
        }

        router.push(`/voting/wait-player/${player._id}`)
        return
    }

    return (
        <DefaultLayout>
            <View
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
                <Title />
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text as="h1" className="!text-white text-shadow-outlined-red">
                        {votePlayer?.name}
                    </Text>
                </View>

                <Text as="body" className="text-center">
                    Vote em quem você acha que é o impostor!
                </Text>

                <View className="flex items-center justify-center w-full px-8 space-y-4">
                    {possiblePlayers.map((player) => {
                        return (
                            <ButtonSecondary
                                key={player._id}
                                onPress={handleNext.bind(null, player._id)}
                                className="w-full px-0 py-1 rounded-full md:w-1/2"
                            >
                                <Text as="h3" className="text-gray-800">
                                    {player.name}
                                </Text>
                            </ButtonSecondary>
                        )
                    })}
                </View>
            </View>
        </DefaultLayout>
    )
}

export default Voting
