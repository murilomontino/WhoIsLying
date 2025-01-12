import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import type { IPlayer } from '~/store/slices/players/player'
import { delay } from '~/utils/delay'

const RevealScreen = () => {
    const [isExiting, setIsExiting] = useState(false)
    const [player, setPlayer] = useState<IPlayer | null>(null)
    const { id } = useLocalSearchParams()
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        const player = players.find((p) => p._id === id)
        if (player) {
            setPlayer(player)
        } else {
            router.push('/reveal')
        }
    }, [id])

    const handleReveal = useCallback(async () => {
        setIsExiting(true)

        await delay(1000) // Aguarda a animação de saída

        router.push('/reveal')
    }, [])

    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-[85vh] space-y-8">
                <View className="flex flex-col items-center justify-center flex-1 w-full px-2 space-y-4">
                    <Text>Loja de Habilidades</Text>
                    <Text
                        entering={FadeInRight}
                        exiting={FadeOutLeft}
                        demount={isExiting}
                        as="h2"
                        className="!text-white text-shadow-outlined-red"
                    >
                        {player?.name}
                    </Text>
                </View>
                <ScrollView
                    className="max-h-[240px] w-full px-4 "
                    contentContainerClassName="w-full flex-row flex-wrap gap-4"
                >
                    {[...Array(12)].map((_, index) => (
                        <View
                            key={index}
                            className="mb-4 bg-white rounded-lg w-44 h-44"
                        >
                            <Text>Item {index + 1}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View
                    delay={1100}
                    entering={FadeInRight}
                    demount={isExiting}
                    exiting={FadeOutLeft}
                    className="flex flex-[0.5] items-center justify-center w-full px-8"
                >
                    <ButtonPrimary
                        onPress={handleReveal}
                        className="w-full rounded-full"
                    >
                        <Text
                            className="!text-white text-shadow-outlined-red"
                            as="h3"
                        >
                            Entendido
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RevealScreen
