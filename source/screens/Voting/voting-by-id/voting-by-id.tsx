import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onUpdateCanPlayerVote } from '~/store/slices/players/actions'
import type { Player } from '~/store/slices/players/player'

const Voting = () => {
    const { id } = useLocalSearchParams()
    const [votePlayer, setVotePlayer] = useState<typeof Player | null>(null)
    const dispatch = useAppDispatch()
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setVotePlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const handleNext = () => {
        dispatch(
            onUpdateCanPlayerVote({
                _id: votePlayer?._id as string,
                canVote: false,
            }),
        )

        const player = players.find((p) => p.canVote && p._id !== votePlayer?._id)

        if (!player) {
            return router.push('/round-table')
        }

        router.push(`/asking/${player._id}`)
        return
    }

    return (
        <DefaultLayout>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
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

                <View className="flex items-center justify-center w-full px-8">
                    <ButtonSecondary
                        onPress={handleNext}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text
                            className="text-gray-800"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#ef4444', // Cor da borda
                                textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
                        >
                            Próximo
                        </Text>
                    </ButtonSecondary>
                </View>
            </Animated.View>
        </DefaultLayout>
    )
}

export default Voting
