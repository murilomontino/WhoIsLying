import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import type { Player } from '~/store/slices/players/player'

const RevealScreen = () => {
    const [player, setPlayer] = useState<typeof Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return
        const currentPlayer = players.find((player) => !player.reveal)
        if (!currentPlayer) {
            router.push('/asking')
            return
        }
        setPlayer(currentPlayer)
    }, [players, player?.reveal, isMounted])

    const handleReveal = () => {
        router.navigate(`/reveal/${player?._id}`)
    }

    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-[85vh] space-y-8">
                <View className="flex flex-col items-center justify-center w-full px-2 mb-8 ">
                    <Text className="text-center !text-white " as="h3">
                        Passe para o(a){' '}
                    </Text>
                    <Text
                        as="h1"
                        className="!text-gray-800 text-shadow-outlined-red text-pretty"
                    >
                        {player?.name}
                    </Text>
                </View>
                <View className="h-20 my-2 ">
                    <Text
                        style={{
                            fontSize: 128,
                            transform: [{ rotate: '35deg' }],
                        }}
                        className="text-center text-white"
                    >
                        🤫
                    </Text>
                </View>

                <Text
                    as="body"
                    className="w-full px-8 text-center !text-white text-shadow-outlined md:w-1/2"
                >
                    Cada Jogador, exceto o que está fora da Rodada, vai ver a mesma
                    comida secreta.
                </Text>
                <View className="flex items-center justify-center w-full px-8">
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
