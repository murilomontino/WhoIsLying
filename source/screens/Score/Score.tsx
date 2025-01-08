import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import {
    BounceIn,
    BounceOut,
    FadeIn,
    FadeInLeft,
    FadeOut,
    FadeOutRight,
    LinearTransition,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import Score from '~/components/molecules/score'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { type NewPlayersScore, onScorePlayers } from '~/store/slices/game/actions'
import type { IPlayer } from '~/store/slices/players/player'
import { calcScoreDisguisedPlayer, calcScorePlayer } from '~/utils/calcScore'
import { delay } from '~/utils/delay'

const ScoreScreen = () => {
    const [isExiting, setIsExiting] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { players } = useAppSelector((state) => state.players)
    const { disguisedPlayer, questionRound, votingItem, points, round, rounds } =
        useAppSelector((state) => state.game)

    const winner = useMemo(() => {
        return players.reduce((acc, player) => {
            if (player.displayVotes > acc.displayVotes) {
                return player
            }

            return acc
        })
    }, [])

    const playersScore: NewPlayersScore[] = useMemo(() => {
        return players.map((player: IPlayer) => {
            if (!disguisedPlayer) {
                return { ...player, sumScore: 0 }
            }

            if (player._id === disguisedPlayer?._id) {
                return {
                    _id: player._id,
                    name: player.name,
                    score: player.score,
                    sumScore: calcScoreDisguisedPlayer({
                        disguised_player: disguisedPlayer,
                        winner,
                        questionRound,
                        choose: votingItem,
                        item: 'cartoon',
                    }),
                }
            }

            return {
                _id: player._id,
                name: player.name,
                score: player.score,
                sumScore: calcScorePlayer({
                    player,
                    disguised_player: disguisedPlayer,
                    winner,
                    questionRound,
                }),
            }
        })
    }, [players, disguisedPlayer, winner, questionRound, votingItem])

    const [sortedPlayers, setSortedPlayers] = useState(playersScore)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSortedPlayers(
                [...playersScore].sort(
                    (a, b) => b.sumScore + b.score - (a.sumScore + a.score),
                ),
            )
        }, 1500) // 1.5 segundos de espera para iniciar a animação de ordenação

        return () => clearTimeout(timer)
    }, [playersScore])

    const handleContinue = async () => {
        dispatch(onScorePlayers({ playersScore: playersScore }))
        setIsExiting(true)
        await delay(1000)

        const conditionVictoryByRound = round >= rounds
        const conditionVictoryByPoints = players.find(
            (player) => player.score >= points,
        )

        if (conditionVictoryByRound || conditionVictoryByPoints) {
            router.push('/victory')
            return
        }

        router.push('/new-round')
    }

    return (
        <DefaultLayout>
            <GoBack />
            <View
                delay={100}
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center w-full h-full justify-evenly"
            >
                <View
                    delay={100}
                    demount={isExiting}
                    entering={FadeIn}
                    exiting={FadeOut}
                    className="flex flex-col items-center justify-center w-full gap-2 px-2"
                >
                    <Title />
                    <Text
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOutRight.duration(1000)}
                        as="h2"
                        className="text-center !text-white text-shadow-outlined-red"
                    >
                        Pontuação
                    </Text>
                </View>
                <ScrollView
                    contentContainerClassName="gap-2"
                    className="flex max-h-[38vh] w-full overflow-y-auto flex-col py-2 px-2 overflow-auto flex-[2] h-52 md:w-1/2"
                >
                    {sortedPlayers.map((player, index) => (
                        <View
                            layout={LinearTransition.springify().duration(500)} // Ordenação animada
                            delay={(index + 1) * 100}
                            entering={FadeInLeft}
                            exiting={FadeOutRight}
                            demount={isExiting}
                            key={player._id}
                            className="flex flex-row items-center flex-1 h-10 px-4 py-2 space-x-4 bg-white rounded-full min-h-10 max-h-10"
                        >
                            <Text className="text-2xl flex-[8] text-center text-gray-800">
                                {player.name}
                            </Text>
                            <View className="flex-[2] min-w-[64px]">
                                <Score
                                    playerScore={player.score}
                                    sumScore={player.sumScore}
                                />
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View
                    delay={100}
                    demount={isExiting}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    className="flex flex-row items-center justify-center w-full px-4"
                >
                    <ButtonPrimary onPress={handleContinue} className="w-full ">
                        <Text
                            as="h3"
                            className="!text-white text-shadow-outlined-red"
                        >
                            Nova Rodada
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default ScoreScreen
