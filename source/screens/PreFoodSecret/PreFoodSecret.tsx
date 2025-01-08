import { useRouter } from 'expo-router'
import {
    BounceIn,
    BounceInLeft,
    BounceInRight,
    BounceOut,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import View from '~/components/ui/view'
import { useAppSelector } from '~/store/hooks'

const PreFoodSecretScreen = () => {
    const router = useRouter()
    const { disguisedPlayer } = useAppSelector((state) => state.game)
    const handleContinue = () => {
        router.push('/food-secret')
    }
    const { category } = useAppSelector((state) => state.categories)

    return (
        <DefaultLayout>
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
                    <View className="flex flex-col items-center justify-center w-full px-2 mb-8 ">
                        <Text
                            delay={250}
                            entering={BounceInRight.damping(0.5).duration(500)}
                            as="h3"
                            className="text-center !text-white "
                        >
                            Passe para o(a){' '}
                        </Text>
                        <Text
                            delay={250}
                            entering={BounceInLeft.damping(0.5).duration(500)}
                            as="h1"
                            className="!text-gray-800 text-shadow-outlined-red text-pretty"
                        >
                            {disguisedPlayer?.name}
                        </Text>
                    </View>
                </View>
                <Text
                    delay={100}
                    entering={FadeIn.duration(1000)}
                    as="h4"
                    className="text-center !text-white text-shadow-outlined"
                >
                    Agora você deve tentar adivinhar qual é o(a)
                    <Text
                        delay={250}
                        entering={BounceInLeft.damping(0.5).duration(500)}
                        as="h4"
                        className="!text-gray-800 text-shadow-outlined-red text-pretty ml-2"
                    >
                        {category}
                    </Text>
                </Text>
                <View
                    delay={100}
                    entering={BounceIn.duration(1000)}
                    exiting={BounceOut.duration(1000)}
                    className="flex flex-row items-center justify-center w-full px-4 space-x-4"
                >
                    <ButtonPrimary onPress={handleContinue} className="w-full">
                        <Text
                            as="h3"
                            className="!text-white text-shadow-outlined-red"
                        >
                            Eu sou o(a) {disguisedPlayer?.name}
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default PreFoodSecretScreen
