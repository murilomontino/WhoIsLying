import React, { useEffect, useState } from 'react'
import { FadeIn, FlipInEasyX, FlipOutEasyX } from 'react-native-reanimated'
import Text from '~/components/atoms/text'

type ScoreProps = {
    playerScore: number
    sumScore: number
}

const Score = ({ playerScore, sumScore = 25 }: ScoreProps) => {
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsExiting(true)
        }, 1000)
    }, [])

    return (
        <Text className="text-2xl flex-[1] text-center text-gray-800">
            <Text
                condition={!isExiting}
                entering={FadeIn.duration(1000)}
                exiting={FlipOutEasyX.duration(500)}
            >
                +{sumScore}
            </Text>
            <Text
                delay={750}
                condition={isExiting}
                entering={FlipInEasyX.duration(500)}
            >
                {playerScore + sumScore}
            </Text>
        </Text>
    )
}

export default Score
