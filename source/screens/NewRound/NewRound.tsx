import { useRouter } from 'expo-router'
import { useState } from 'react'
import { BounceIn, BounceOut, FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { Button, ButtonPrimary, ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { onChangePlayRound } from '~/store/slices/game/actions'
import { delay } from '~/utils/delay'

const NewRoundScreen = () => {
    const router = useRouter()
    const [isExiting, setIsExiting] = useState(false)
    const { round } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleContinueFromCategory = async () => {
        dispatch(onChangePlayRound({ round: round + 1 }))
        setIsExiting(true)
        await delay(1000)
        router.push('/categories')
    }

    const handleContinueNewRound = async () => {
        dispatch(onChangePlayRound({ round: round + 1 }))
        setIsExiting(true)
        await delay(1000)
        router.push(`/pre-start/${round + 1}`)
    }

    const handleContinueNewPlayer = async () => {
        dispatch(onChangePlayRound({ round: round + 1 }))
        setIsExiting(true)
        await delay(1000)
        router.push('/')
    }

    return (
        <DefaultLayout className="items-center justify-center">
            <GoBack />
            <View
                delay={100}
                demount={isExiting}
                entering={FadeIn}
                exiting={FadeOut}
                className="flex flex-col items-center justify-center w-full px-2 !mb-12 space-y-4"
            >
                <Title />
                <Text
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                    as="h2"
                    className="text-center !text-white text-shadow-outlined-red"
                >
                    Nova Rodada
                </Text>
            </View>

            <View
                delay={100}
                demount={isExiting}
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <ButtonSecondary
                    onPress={handleContinueFromCategory}
                    className="w-full md:w-1/2"
                >
                    <Text as="h3">Escolher Categoria</Text>
                </ButtonSecondary>
            </View>
            <View
                delay={100}
                demount={isExiting}
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <ButtonPrimary
                    onPress={handleContinueNewRound}
                    className="w-full md:w-1/2"
                >
                    <Text as="h3" className="!text-white text-shadow-outlined-red">
                        Manter Categoria e Continuar
                    </Text>
                </ButtonPrimary>
            </View>
            <View
                delay={100}
                demount={isExiting}
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <Button
                    onPress={handleContinueNewPlayer}
                    className="items-center justify-center w-full md:w-1/2 "
                >
                    <Text as="h3" className="px-4 py-2 ">
                        + Adicionar/Remover Jogador(a)
                    </Text>
                </Button>
            </View>
        </DefaultLayout>
    )
}

export default NewRoundScreen
