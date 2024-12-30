import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { useAppSelector } from '~/store/hooks'

const Voting = () => {
    const { players } = useAppSelector((state) => state.players)
    const [isMounted, setIsMounted] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const nextPlayer = players.find((player) => player.canVote)
        if (!nextPlayer) {
            router.push('/game-over')
            return
        }

        router.push(`/voting/${nextPlayer._id}`)
    }, [players, isMounted])

    return (
        <DefaultLayout>
            <View>
                <Text>Carregando...</Text>
            </View>
        </DefaultLayout>
    )
}

export default Voting