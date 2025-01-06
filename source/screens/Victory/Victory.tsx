import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import {
    BounceIn,
    BounceInLeft,
    BounceInRight,
    BounceOut,
    FadeIn,
    FadeOut,
    FadeOutRight,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { delay } from '~/utils/delay'

const VictoryScreen = () => {
    const [isExiting, setIsExiting] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { players } = useAppSelector((state) => state.players)

    const sortedPlayers = useMemo(
        () => players.toSorted((a, b) => b.score - a.score),
        [players],
    )

    const handleContinue = async () => {
        setIsExiting(true)
        await delay(1000)
    }

    return (
        <DefaultLayout>
            <GoBack />
            <View
                delay={100}
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center w-full h-full justify-evenly"
            >
                <View
                    delay={100}
                    demount={isExiting}
                    entering={FadeIn}
                    exiting={FadeOut}
                    className="flex flex-col items-center justify-center w-full px-2 space-y-4"
                >
                    <Title />
                    <Text
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOutRight.duration(1000)}
                        as="h2"
                        className="text-center !text-white text-shadow-outlined-red"
                    >
                        Parabéns
                    </Text>

                    <Text
                        entering={BounceInLeft.duration(1000)}
                        exiting={BounceInRight.duration(1000)}
                        as="h1"
                        className="text-center !text-white text-shadow-outlined"
                    >
                        {sortedPlayers[0].name}{' '}
                    </Text>

                    <Text
                        delay={1000}
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOutRight.duration(1000)}
                        as="h3"
                    >
                        Você venceu! Que grande dissimulado você é! Eu diria para
                        seus amigos tomarem cuidado!
                    </Text>
                </View>

                <View
                    delay={100}
                    demount={isExiting}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    className="flex flex-row items-center justify-center w-full px-4 space-x-4"
                >
                    <ButtonPrimary
                        onPress={handleContinue}
                        className="w-full md:w-1/2"
                    >
                        <Text
                            as="h3"
                            className="!text-white text-shadow-outlined-red"
                        >
                            Ir Para Tela Inicial
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default VictoryScreen
