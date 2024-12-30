import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useAppSelector } from '~/store/hooks'

const AskingScreen = () => {
    const { players } = useAppSelector((state) => state.players)

    const router = useRouter()

    useEffect(() => {
        const nextAskPlayer = players.find((player) => player.canAsk)
        if (!nextAskPlayer) {
            router.push('/round-table')
            return
        }

        router.push(`/asking/${nextAskPlayer._id}`)
    }, [players])

    return null
}

export default AskingScreen
