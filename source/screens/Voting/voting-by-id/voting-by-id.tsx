import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
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
            return router.push('/result')
        }

        router.push(`/voting/wait-player/${player._id}`)
        return
    }

    return (
        <DefaultLayout>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
                <Title />
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#181818', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                        className="text-5xl font-bold text-white text-pretty "
                    >
                        {votePlayer?.name}
                    </Text>
                </View>

                <Text
                    className="text-center text-white"
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        fontSize: 24,
                        textShadowColor: '#ef4444', // Cor da borda
                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                    }}
                >
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
                                <Text
                                    className="text-gray-800"
                                    style={{
                                        fontFamily: 'Bangers_400Regular',
                                        fontSize: 32,
                                        textShadowColor: '#ef4444', // Cor da borda
                                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                                        textShadowRadius: 2, // Raio para suavizar a sombra
                                    }}
                                >
                                    {player.name}
                                </Text>
                            </ButtonSecondary>
                        )
                    })}
                </View>
            </Animated.View>
        </DefaultLayout>
    )
}

export default Voting
