import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useAppSelector } from '~/store/hooks'

const GameOver = () => {
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()

    useEffect(() => {
        for (const player of players) {
            player.hidePlayer()
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
