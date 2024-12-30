import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onUpdatePlayerCanAnswer,
    onUpdatePlayerCanAsk,
    onUpdatePlayerReveal,
} from '~/store/slices/players/actions'

const GameOver = () => {
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        for (const player of players) {
            dispatch(
                onUpdatePlayerCanAnswer({
                    _id: player._id,
                    canAnswer: true,
                }),
            )
            dispatch(
                onUpdatePlayerCanAsk({
                    _id: player._id,
                    canAsk: true,
                }),
            )
            dispatch(
                onUpdatePlayerReveal({
                    _id: player._id,
                    reveal: false,
                }),
            )
        }

        router.push('/pre-start')
    }, [players])

    return (
        <View>
            <Text>GameOver</Text>
        </View>
    )
}

export default GameOver
