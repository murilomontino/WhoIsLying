import { useRouter } from 'expo-router'
import React from 'react'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import Points from '~/components/molecules/points'
import Rounds from '~/components/molecules/rounds'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onChangeQuestionRound,
    onGenerateDisguised,
} from '~/store/slices/game/actions'
import { onResetPlayers } from '~/store/slices/players/actions'
import { delay } from '~/utils/delay'

const PreStartScreen = () => {
    const { category } = useAppSelector((state) => state.categories)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleStartGame = async () => {
        dispatch(onResetPlayers())
        dispatch(onChangeQuestionRound({ questionRound: 1 }))
        dispatch(onGenerateDisguised())
        await delay(100)
        router.push('/reveal')
    }

    return (
        <DefaultLayout>
            <GoBack />
            <Title />
            <Text
                className="text-center text-gray-800"
                style={{
                    fontFamily: 'Bangers_400Regular',
                    fontSize: 42,
                    textShadowColor: '#ef4444', // Cor da borda
                    textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                    textShadowRadius: 2, // Raio para suavizar a sombra
                }}
            >
                {category}
            </Text>
            <View className="flex flex-col items-center justify-center w-full px-2 space-y-4">
                <Text className="w-full text-left text-gray-800 md:w-1/2">
                    Condição de Vitória
                </Text>
                <Rounds />
                <Points />
            </View>

            <View className="flex flex-row items-center justify-center w-full px-4 space-x-4">
                <ButtonPrimary
                    className="w-full md:w-1/2"
                    onPress={handleStartGame}
                >
                    <Text as="h3" className="!text-white text-shadow-outlined-red">
                        Start Game
                        {/* <AntDesign
                            name="play"
                            size={36}
                            color="white"
                            className="ml-2"
                        /> */}
                    </Text>
                </ButtonPrimary>
            </View>
        </DefaultLayout>
    )
}

export default PreStartScreen
