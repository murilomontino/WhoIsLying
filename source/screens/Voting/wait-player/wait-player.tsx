import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    BounceInLeft,
    BounceInRight,
    BounceOutLeft,
    BounceOutRight,
    FadeIn,
    FadeInDown,
    FadeOut,
    FadeOutDown,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'
import { delay } from '~/utils/delay'

const WaitPlayerScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [isExiting, setIsExiting] = useState(false)
    const router = useRouter()
    const { players } = useAppSelector((state) => state.players)
    const { id } = useLocalSearchParams()

    useEffect(() => {
        if (!isMounted) return
        const player = players.find((p) => p._id === id)
        if (player) {
            setPlayer(player)
        } else {
            router.push('/game-over')
        }
    }, [id, isMounted])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleReveal = async () => {
        setIsExiting(true)
        await delay(1000)
        router.navigate(`/voting/${player?._id}`)
    }

    return (
        <DefaultLayout>
            <View
                delay={100}
                demount={isExiting}
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(500)}
                className="flex flex-col items-center justify-center w-full h-full space-y-8"
            >
                <View
                    exiting={FadeOut.duration(500)}
                    demount={isExiting}
                    className="flex flex-col items-center justify-center w-full px-2 space-y-4"
                >
                    <Text
                        demount={isExiting}
                        entering={BounceInLeft.duration(500)}
                        exiting={BounceOutRight.duration(500)}
                        as="h4"
                        className="text-center text-gray-800"
                    >
                        Passe para o(a){' '}
                    </Text>
                    <Text
                        demount={isExiting}
                        as="h1"
                        entering={BounceInRight.duration(500)}
                        exiting={BounceOutLeft.duration(500)}
                        className="!text-gray-800 text-shadow-outlined-red"
                    >
                        {player?.name}
                    </Text>
                </View>

                <View
                    demount={isExiting}
                    entering={FadeInDown.duration(500)}
                    exiting={FadeOutDown.duration(500)}
                    className="flex items-center justify-center w-full px-8"
                >
                    <ButtonSecondary
                        onPress={handleReveal}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text className="text-gray-800" as="h3">
                            Eu sou o(a) {player?.name}
                        </Text>
                    </ButtonSecondary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default WaitPlayerScreen
