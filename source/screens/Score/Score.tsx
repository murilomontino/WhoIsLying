import { useRouter } from 'expo-router'
import {
    BounceIn,
    BounceOut,
    FadeIn,
    FadeInLeft,
    FadeOut,
    FadeOutRight,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'

const ScoreScreen = () => {
    const router = useRouter()
    const { players } = useAppSelector((state) => state.players)
    const handleContinue = () => {
        // router.push('/result')
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
                        Pontuação
                    </Text>
                </View>
                <View className="flex flex-col w-full px-4 space-y-4 overflow-auto h-52 md:w-1/2">
                    {players.map((player, index) => (
                        <View
                            delay={(index + 1) * 100}
                            entering={FadeInLeft}
                            exiting={FadeOutRight}
                            key={player._id}
                            className="flex flex-row items-center flex-1 h-10 px-4 py-2 space-x-4 bg-white rounded-full min-h-10 max-h-10"
                        >
                            <Text className="text-2xl flex-[10] text-center text-gray-800">
                                {player.name}
                            </Text>
                            <Text className="text-2xl flex-[1] text-center text-gray-800">
                                {player.score}
                            </Text>
                        </View>
                    ))}
                </View>
                <View
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
                            Continuar
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default ScoreScreen
