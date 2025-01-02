import { Link } from 'expo-router'
import { useMemo, useState } from 'react'
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
import { useAppSelector } from '~/store/hooks'

const ResultScreen = () => {
    const { players } = useAppSelector((state) => state.players)
    const { disguisedPlayer } = useAppSelector((state) => state.game)
    const [reveal, setReveal] = useState(false)
    const minDelay = 1000
    const delayName = 2000
    const delayProx = 3000

    const handleReveal = () => {
        setReveal(true)
    }

    const winner = useMemo(() => {
        return players.reduce((acc, player) => {
            if (player.displayVotes > acc.displayVotes) {
                return player
            }
            return acc
        })
    }, [])

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
                        {winner.name}
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
                        winnerSound={disguisedPlayer?._id === winner._id}
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
                    <Link href="/food-secret" asChild>
                        <ButtonPrimary className="w-full md:w-1/2">
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
