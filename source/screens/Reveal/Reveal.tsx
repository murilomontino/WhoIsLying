import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import {
    BounceInLeft,
    BounceInRight,
    Easing,
    FadeIn,
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'
import { drawPlayerWithConditions } from '~/utils/drawPlayer'

const RevealScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    const opacity = useSharedValue(1)
    const translateX = useSharedValue(0)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const revealEffect = useCallback(async () => {
        const currentPlayer = players.find((player) => !player.reveal)

        if (currentPlayer) {
            return setPlayer(currentPlayer)
        }

        const answerPlayer = await drawPlayerWithConditions(
            players,
            (player) => player._id !== players[0]._id,
        )
        router.push(`/asking/1/${players[0]._id}/${answerPlayer._id}`)
        return
    }, [players, router])

    useEffect(() => {
        if (!isMounted) return
        revealEffect()
    }, [revealEffect, isMounted])

    const handleReveal = () => {
        opacity.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
        })
        translateX.value = withTiming(
            -100,
            { duration: 1000, easing: Easing.out(Easing.quad) },
            () => {
                router.push(`/reveal/${player?._id}`)
            },
        )
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateX: translateX.value }],
        }
    })

    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-[85vh] space-y-8">
                <View className="flex flex-col items-center justify-center w-full px-2 mb-8 ">
                    <Text
                        delay={250}
                        entering={BounceInRight.damping(0.5).duration(500)}
                        style={animatedStyle}
                        as="h3"
                        className="text-center !text-white "
                    >
                        Passe para o(a){' '}
                    </Text>
                    <Text
                        delay={250}
                        entering={BounceInLeft.damping(0.5).duration(500)}
                        style={animatedStyle}
                        as="h1"
                        className="!text-gray-800 text-shadow-outlined-red text-pretty"
                    >
                        {player?.name}
                    </Text>
                </View>
                <View className="h-20 my-2 ">
                    <Text
                        delay={250}
                        entering={FadeIn.duration(1000)}
                        style={[
                            animatedStyle,
                            {
                                fontSize: 128,
                                transform: [{ rotate: '35deg' }],
                            },
                        ]}
                        className="text-center text-white"
                    >
                        🤫
                    </Text>
                </View>

                <Text
                    delay={250}
                    entering={FadeIn.duration(1000)}
                    style={animatedStyle}
                    as="body"
                    className="w-full px-8 text-center !text-white text-shadow-outlined md:w-1/2"
                >
                    Cada Jogador, exceto o que está fora da Rodada, vai ver a mesma
                    comida secreta.
                </Text>
                <View
                    delay={250}
                    entering={FadeInDown.duration(250)}
                    style={animatedStyle}
                    className="flex items-center justify-center w-full px-8"
                >
                    <ButtonSecondary
                        onPress={handleReveal}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text as="h3">Eu sou o(a) {player?.name}</Text>
                    </ButtonSecondary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RevealScreen
