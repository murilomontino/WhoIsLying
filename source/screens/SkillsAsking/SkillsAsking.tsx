import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    BounceInLeft,
    BounceInRight,
    BounceOutLeft,
    BounceOutRight,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'

const RevealScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

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
                        Loja de Habilidades
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
            </View>
        </DefaultLayout>
    )
}

export default RevealScreen
