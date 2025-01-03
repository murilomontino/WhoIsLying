import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import {
    BounceIn,
    BounceOut,
    FadeIn,
    FadeInLeft,
    FadeInRight,
    FadeOut,
    FadeOutRight,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'
import { delay } from '~/utils/delay'
import { drawPlayerWithConditions } from '~/utils/drawPlayer'

const PreAskingScreen = () => {
    const router = useRouter()
    const [isExiting, setIsExiting] = useState(false)

    const { players } = useAppSelector((state) => state.players)
    const { category } = useAppSelector((state) => state.categories)

    const handleContinue = useCallback(async () => {
        setIsExiting(true)
        const answerPlayer = await drawPlayerWithConditions(
            players,
            (player) => player._id !== players[0]._id,
        )
        await delay(1000)
        router.push(`/asking/1/${players[0]._id}/${answerPlayer._id}`)
        return
    }, [players, router])

    return (
        <DefaultLayout>
            <View
                delay={100}
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center w-full h-full justify-evenly"
            >
                <View
                    demount={isExiting}
                    delay={100}
                    entering={FadeIn}
                    exiting={FadeOut}
                    className="flex flex-col items-center justify-center w-full px-2 space-y-4"
                >
                    <Title />
                    <Text
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="h2"
                        className="text-center !text-white text-shadow-outlined-red"
                    >
                        Rodada de Perguntas
                    </Text>
                </View>
                <View
                    demount={isExiting}
                    exiting={FadeOut.duration(1000)}
                    entering={FadeInLeft.duration(1000)}
                    className="flex items-center justify-center w-full space-y-2"
                >
                    <Text
                        demount={isExiting}
                        delay={250}
                        exiting={FadeOut.duration(1000)}
                        as="body"
                        entering={FadeInLeft.duration(1000)}
                        className="px-4 text-justify text-gray-800 md:w-1/2"
                    >
                        Responda a perguntas relacionadas a(o){' '}
                        <Text className="text-black">{category}</Text>, mas
                        garantindo que não o revele diretamente.
                    </Text>
                    <Text
                        demount={isExiting}
                        delay={250}
                        exiting={FadeOut.duration(100)}
                        as="body"
                        entering={FadeIn.duration(1000)}
                        className="px-4 text-justify text-gray-800 md:w-1/2"
                    >
                        Seja breve e objetivo em suas respostas.
                    </Text>
                    <Text
                        demount={isExiting}
                        delay={250}
                        exiting={FadeOut.duration(100)}
                        as="body"
                        entering={FadeInLeft.duration(1000)}
                        className="px-4 text-justify text-gray-800 md:w-1/2"
                    >
                        Sempre diga a verdade.
                    </Text>
                    <Text
                        demount={isExiting}
                        delay={250}
                        as="body"
                        exiting={FadeOut.duration(100)}
                        entering={FadeInRight.duration(1000)}
                        className="px-4 text-justify text-gray-800 md:w-1/2"
                    >
                        Sinta-se à vontade para perguntar que não estejam
                        mencionadas.
                    </Text>
                </View>
                <Text
                    demount={isExiting}
                    delay={100}
                    exiting={FadeOutRight.duration(1000)}
                    entering={FadeIn.duration(1000)}
                    as="h2"
                    className="text-center !text-white text-shadow-outlined"
                >
                    Mostre esta tela para todos
                </Text>
                <View
                    demount={isExiting}
                    delay={100}
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
                            Começar
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default PreAskingScreen
