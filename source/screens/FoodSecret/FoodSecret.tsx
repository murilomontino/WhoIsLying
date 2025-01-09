import cn from 'classnames'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
    BounceIn,
    BounceInLeft,
    BounceOut,
    FadeIn,
    FadeInLeft,
    FadeOut,
    FadeOutRight,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { Button, ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onVotingItem } from '~/store/slices/game/actions'
import { delay } from '~/utils/delay'

const FoodSecretScreen = () => {
    const router = useRouter()
    const [voting, setVoting] = useState<string | null>(null)
    const [isExisting, setIsExisting] = useState(false)
    const { disguisedPlayer } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleVote = (item: string) => {
        setVoting(item)
    }

    const handleConfirmVote = async () => {
        if (!voting) return
        setIsExisting(true)
        dispatch(onVotingItem({ votingItem: voting }))

        await delay(1000)
        router.push('/reveal-food')
    }

    return (
        <DefaultLayout>
            <View
                delay={100}
                entering={FadeIn.duration(1000)}
                exiting={FadeOut.duration(1000)}
                demount={isExisting}
                className="flex flex-col items-center w-full h-full justify-evenly"
            >
                <View
                    delay={100}
                    className="flex flex-col items-center justify-center w-full px-2 space-y-4"
                >
                    <Text
                        delay={250}
                        entering={BounceInLeft.damping(0.5).duration(500)}
                        exiting={BounceOut.damping(0.5).duration(500)}
                        demount={isExisting}
                        as="h1"
                        className="!text-gray-800 text-shadow-outlined-red text-pretty"
                    >
                        {disguisedPlayer?.name}
                    </Text>
                    <Text
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        demount={isExisting}
                        as="h2"
                        className="text-center !text-white text-shadow-outlined-red"
                    >
                        Vote na Comida
                    </Text>
                </View>
                <View
                    delay={300}
                    className="grid grid-cols-2 w-full px-4 gap-2 md:w-[60vw]"
                >
                    {[
                        {
                            name: 'Curupira',
                        },
                        {
                            name: 'Arroz',
                        },
                        {
                            name: 'Cartoon',
                        },
                        {
                            name: 'Macarrão',
                        },
                        {
                            name: 'Batata',
                        },
                        {
                            name: 'Salada',
                        },
                        {
                            name: 'Porco',
                        },
                        {
                            name: 'Peixe-Frito',
                        },
                    ].map((item, index) => (
                        <View
                            delay={(index + 1) * 250}
                            demount={isExisting}
                            entering={FadeInLeft.duration(500)}
                            exiting={FadeOutRight.duration(500)}
                            key={item.name}
                            className={cn(
                                'flex items-center w-full h-10 rounded-full min-h-10 max-h-10',
                                {
                                    'bg-blue-500': voting === item.name,
                                    'bg-gray-200': voting !== item.name,
                                },
                            )}
                        >
                            <Button
                                onPress={() => handleVote(item.name)}
                                className="flex items-center justify-center w-full h-full"
                            >
                                <Text
                                    demount={isExisting}
                                    entering={FadeInLeft.duration(500)}
                                    exiting={FadeOutRight.duration(500)}
                                    className="text-2xl flex-[10] text-center text-gray-800"
                                >
                                    {item.name}
                                </Text>
                            </Button>
                        </View>
                    ))}
                </View>
                <View
                    delay={100}
                    condition={!!voting}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    demount={isExisting}
                    className="flex flex-row items-center justify-center w-full px-4 space-x-4"
                >
                    <ButtonPrimary
                        disabled={!voting}
                        onPress={handleConfirmVote}
                        className="w-full"
                    >
                        <Text className="!text-white" as="h3">
                            Votar em {voting}
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default FoodSecretScreen
