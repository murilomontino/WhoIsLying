import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { useAppSelector } from '~/store/hooks'

const AskingScreen = () => {
    const { players } = useAppSelector((state) => state.players)
    const [isMounted, setIsMounted] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const nextAskPlayer = players.find((player) => player.canAsk)
        if (!nextAskPlayer) return router.push('/round-table')

        return router.push(`/asking/${nextAskPlayer._id}`)
    }, [players, isMounted])

    return (
        <DefaultLayout>
            <View>
                <Text>Carregando...</Text>
            </View>
        </DefaultLayout>
    )
}

export default AskingScreen
