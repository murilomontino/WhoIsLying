import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import {
    BounceInLeft,
    BounceInRight,
    BounceOutLeft,
    BounceOutRight,
    FadeIn,
    FadeInDown,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'
import { delay } from '~/utils/delay'

const RevealScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const revealEffect = useCallback(async () => {
        await delay(100)
        const currentPlayer = players.find((player) => !player.reveal)

        if (currentPlayer) {
            return setPlayer(currentPlayer)
        }

        router.push('/pre-asking')
        return
    }, [players, router])

    useEffect(() => {
        if (!isMounted) return
        revealEffect()
    }, [revealEffect, isMounted])

    const handleReveal = useCallback(async () => {
        setIsExiting(true)
        await delay(1000)

        router.push(`/reveal/${player?._id}`)
    }, [player?._id, router])

    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-[85vh] space-y-8">
                <View className="flex flex-col items-center justify-center flex-1 w-full px-2 mb-8 ">
                    <Text
                        delay={250}
                        exiting={BounceOutLeft.duration(1000)}
                        demount={isExiting}
                        entering={BounceInRight.damping(0.5).duration(500)}
                        as="h3"
                        className="text-center !text-white "
                    >
                        Passe para o(a){' '}
                    </Text>
                    <Text
                        delay={250}
                        exiting={BounceOutRight.duration(1000)}
                        demount={isExiting}
                        entering={BounceInLeft.damping(0.5).duration(500)}
                        as="h1"
                        className="!text-gray-800 text-shadow-outlined-red text-pretty"
                    >
                        {player?.name}
                    </Text>
                </View>
                <View
                    exiting={BounceOutLeft.duration(1000)}
                    demount={isExiting}
                    className="items-center justify-end flex-1 "
                >
                    <Text
                        delay={250}
                        entering={FadeIn.duration(1000)}
                        style={[
                            {
                                fontSize: 24,
                                transform: [{ rotate: '35deg' }],
                            },
                        ]}
                        className="text-center text-white"
                    >
                        🤫
                    </Text>
                </View>
                <View
                    delay={250}
                    entering={FadeInDown.duration(250)}
                    exiting={BounceOutLeft.duration(1000)}
                    demount={isExiting}
                    className="flex items-center justify-center flex-1 w-full px-8"
                >
                    <Text
                        delay={250}
                        entering={FadeIn.duration(1000)}
                        as="body"
                        className="w-full mb-4 px-8 text-center !text-white text-shadow-outlined md:w-1/2"
                    >
                        Cada Jogador, exceto o que está fora da Rodada, vai ver a
                        mesma comida secreta.
                    </Text>

                    <ButtonSecondary
                        onPress={handleReveal}
                        className="w-full rounded-full "
                    >
                        <Text as="h3">Eu sou o(a) {player?.name}</Text>
                    </ButtonSecondary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RevealScreen
