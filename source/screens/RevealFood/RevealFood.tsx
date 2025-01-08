import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
    BounceIn,
    BounceInLeft,
    BounceOut,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Dice3D from '~/components/molecules/coin'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'

const RevealFoodScreen = () => {
    const router = useRouter()
    const { category } = useAppSelector((state) => state.categories)
    const { disguisedPlayer, votingItem } = useAppSelector((state) => state.game)
    const minDelay = 1000
    const delayName = 2000
    const delayProx = 3000
    const [reveal, setReveal] = useState(false)
    const handleReveal = () => {
        setReveal(true)
    }
    const handleContinue = () => {
        router.push('/score')
    }

    return (
        <DefaultLayout>
            <View
                delay={300}
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center w-full h-full justify-evenly"
            >
                <Text
                    delay={100}
                    entering={FadeIn.duration(1000)}
                    as="h2"
                    className="text-center !text-white text-shadow-outlined"
                >
                    Mostre esta tela para todos
                </Text>
                <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                    <Text
                        delay={minDelay}
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="h2"
                        className="text-center  !text-white text-shadow-outlined"
                    >
                        {disguisedPlayer?.name} escolheu...
                    </Text>
                    <Text
                        delay={minDelay + delayName}
                        entering={BounceInLeft.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="h2"
                        className="text-center !text-gray-800 text-shadow-outlined-red"
                    >
                        {votingItem}
                    </Text>
                </View>
                <View
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                    delay={minDelay + delayProx}
                    className="flex flex-col items-center justify-center w-full px-4 space-x-4 space-y-2"
                >
                    <Text
                        className="text-center !text-white text-shadow-outlined"
                        as="body"
                    >
                        Qual {category} é...
                    </Text>
                    <Dice3D
                        winnerSound={
                            votingItem.trim().toLowerCase() ===
                            'cartoon'.trim().toLowerCase()
                        }
                        onFinally={handleReveal}
                        initialWord="Revelar"
                        finalWord={'cartoon'}
                        words={[
                            'Pizza',
                            'Hamburguer',
                            votingItem,
                            'Sushi',
                            'Salada',
                            'Churrasco',
                        ]}
                    />
                </View>

                <View
                    condition={reveal}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    className="flex flex-row items-center justify-center w-full px-4 space-x-4"
                >
                    <ButtonPrimary onPress={handleContinue} className="w-full">
                        <Text
                            as="h3"
                            className="!text-white text-shadow-outlined-red"
                        >
                            Ver Pontuação
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default RevealFoodScreen
