import { Link } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import {
    BounceIn,
    BounceInLeft,
    BounceOut,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import CoinFlip from '~/components/molecules/coin'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangeMostVoted } from '~/store/slices/game/actions'
import type { IPlayer } from '~/store/slices/players/player'
import { delay } from '~/utils/delay'

const ResultScreen = () => {
    const { players } = useAppSelector((state) => state.players)
    const { disguisedPlayer } = useAppSelector((state) => state.game)
    const [reveal, setReveal] = useState(false)
    const dispatch = useAppDispatch()
    const minDelay = 1000
    const delayName = 2000
    const delayProx = 3000

    const mostVoted = useMemo(() => {
        return players.reduce((acc: IPlayer[], player: IPlayer) => {
            if (acc.length === 0 || player.displayVotes > acc[0].displayVotes) {
                return [player]
            }
            if (player.displayVotes === acc[0].displayVotes) {
                return acc.concat(player)
            }
            return acc
        }, [])
    }, [players])

    const isTie = useMemo(() => mostVoted.length > 1, [mostVoted])

    const handleReveal = useCallback(async () => {
        if (isTie) {
            dispatch(onChangeMostVoted({ mostVoted: null }))
        } else {
            dispatch(onChangeMostVoted({ mostVoted: mostVoted[0] }))
        }
        await delay(100)
        setReveal(true)
    }, [mostVoted, isTie])

    const winnerSound = useMemo(() => {
        if (isTie) {
            return false
        }
        const winner = mostVoted[0]
        return disguisedPlayer?._id === winner._id
    }, [isTie, mostVoted, disguisedPlayer])

    return (
        <DefaultLayout>
            <View
                delay={100}
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center w-full h-full justify-evenly"
            >
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Title />

                    <Text
                        delay={minDelay}
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="body"
                        className="text-center  !text-white text-shadow-outlined"
                    >
                        O(a) Mais votado(a) foi...
                    </Text>
                    <Text
                        delay={minDelay + delayName}
                        entering={BounceInLeft.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="h2"
                        className="text-center !text-gray-800 text-shadow-outlined-red"
                    >
                        {isTie ? 'Deu empate!' : mostVoted[0].name}
                    </Text>
                </View>
                <View
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                    delay={minDelay + delayProx}
                    className="flex flex-col items-center justify-center w-full px-4 space-x-4 space-y-2"
                >
                    <Text
                        className="text-center !text-white text-shadow-outlined"
                        as="body"
                    >
                        O Impostor é...
                    </Text>
                    <CoinFlip
                        winnerSound={winnerSound}
                        onFinally={handleReveal}
                        initialWord="Revelar"
                        finalWord={disguisedPlayer?.name}
                        words={players.map((player) => player.name)}
                    />
                </View>

                <View
                    condition={reveal}
                    delay={2000}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    className="flex flex-row items-center justify-center w-full px-4 space-x-4"
                >
                    <Link href="/pre-food-secret" asChild>
                        <ButtonPrimary className="w-full ">
                            <Text
                                as="h3"
                                className="!text-white text-shadow-outlined-red"
                            >
                                Continuar
                            </Text>
                        </ButtonPrimary>
                    </Link>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default ResultScreen
