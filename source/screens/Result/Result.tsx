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
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="h2"
                        className="text-center !text-white text-shadow-outlined-red"
                    >
                        Resultado da Votação
                    </Text>
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
                        delay={minDelay + 500}
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
                    delay={minDelay + 3000}
                    className="flex flex-col items-center justify-center w-full px-4 space-x-4 space-y-2"
                >
                    <Text
                        className="text-center !text-white text-shadow-outlined"
                        as="body"
                    >
                        O Impostor é...
                    </Text>
                    <CoinFlip
                        onFinally={handleReveal}
                        initialWord="Ver Resultado"
                        finalWord={disguisedPlayer?.name}
                        words={players.map((player) => player.name)}
                    />
                </View>
                <Text
                    delay={minDelay + 3000}
                    entering={FadeIn.duration(1000)}
                    as="body"
                    className="text-center !text-white text-shadow-outlined"
                >
                    Mostre esta tela para todos
                </Text>
                <View
                    condition={reveal}
                    delay={2000}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    className="flex flex-row items-center justify-center w-full px-4 space-x-4"
                >
                    <ButtonPrimary className="w-full md:w-1/2">
                        <Text
                            as="h3"
                            className="!text-white text-shadow-outlined-red"
                        >
                            Continuar
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default ResultScreen
