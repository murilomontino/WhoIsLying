import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { ButtonSecondary } from '~/components/atoms/button'
import GoBack from '~/components/molecules/go-back'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onUpdatePlayerCanAnswer,
    onUpdatePlayerCanAsk,
} from '~/store/slices/players/actions'
import type { Player } from '~/store/slices/players/player'

const AskingScreen = () => {
    const [askPlayer, setAskPlayer] = useState<typeof Player | null>(null)
    const [answerPlayer, setAnswerPlayer] = useState<typeof Player | null>(null)
    const dispatch = useAppDispatch()
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        const nextAskPlayer = players.find((player) => player.canAsk)
        if (!nextAskPlayer) {
            router.push('/game-over')
            return
        }
        setAskPlayer(nextAskPlayer)
    }, [players, askPlayer])

    useEffect(() => {
        const canPlayersAnswer = players.filter(
            (player) => player.canAnswer && player._id !== askPlayer?._id,
        )

        // aleatoriamente sorteia um jogador para responder
        if (canPlayersAnswer.length === 1) {
            setAnswerPlayer(canPlayersAnswer[0])
            return
        }

        if (canPlayersAnswer.length === 0) {
            setAnswerPlayer(null)
            router.push('/game-over')
            return
        }

        let answerPlayer = null

        while (answerPlayer === null) {
            const randomIndex = Math.floor(Math.random() * canPlayersAnswer.length)
            if (canPlayersAnswer.length === 0) {
                break
            }
            const player = canPlayersAnswer?.[randomIndex]
            if (player?._id === askPlayer?._id) {
                continue
            }
            answerPlayer = player
        }

        setAnswerPlayer(answerPlayer)
    }, [askPlayer?._id])

    const handleNext = () => {
        setAskPlayer(null)
        dispatch(
            onUpdatePlayerCanAsk({
                _id: askPlayer?._id as string,
                canAsk: false,
            }),
        )
        dispatch(
            onUpdatePlayerCanAnswer({
                _id: answerPlayer?._id as string,
                canAnswer: false,
            }),
        )
    }

    return (
        <DefaultLayout>
            <GoBack />
            <View className="flex flex-col items-center justify-center w-full h-full space-y-8">
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#181818', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                        className="text-5xl font-bold text-white text-pretty "
                    >
                        {answerPlayer?.name}
                    </Text>
                    <Text
                        className="text-center text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 42,
                            textShadowColor: '#181818', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        Pergunta Para
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                        className="font-bold text-white text-7xl text-pretty"
                    >
                        {askPlayer?.name}
                    </Text>
                </View>
                <Text
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        textShadowColor: '#ef4444', // Cor da borda
                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                        fontSize: 200,
                        transform: [{ rotate: '35deg' }],
                    }}
                    className="text-center text-white"
                >
                    {askPlayer?.reveal ? '🍔' : '🤫'}
                </Text>

                <View className="flex items-center justify-center w-full px-8">
                    <ButtonSecondary
                        onPress={handleNext}
                        className="w-full rounded-full md:w-1/2"
                    >
                        <Text
                            className="text-gray-800"
                            style={{
                                fontFamily: 'Bangers_400Regular',
                                fontSize: 42,
                                textShadowColor: '#ef4444', // Cor da borda
                                textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                                textShadowRadius: 2, // Raio para suavizar a sombra
                            }}
                        >
                            Próximo
                        </Text>
                    </ButtonSecondary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default AskingScreen
