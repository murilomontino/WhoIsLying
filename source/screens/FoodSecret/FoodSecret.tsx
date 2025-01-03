import { useRouter } from 'expo-router'
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
import { useAppSelector } from '~/store/hooks'

const FoodSecretScreen = () => {
    const router = useRouter()
    const { disguisedPlayer } = useAppSelector((state) => state.game)
    const handleContinue = () => {
        router.push('/reveal-food')
    }

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
                    <Text
                        delay={250}
                        entering={BounceInLeft.damping(0.5).duration(500)}
                        as="h1"
                        className="!text-gray-800 text-shadow-outlined-red text-pretty"
                    >
                        {disguisedPlayer?.name}
                    </Text>
                    <Text
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(1000)}
                        as="h2"
                        className="text-center !text-white text-shadow-outlined-red"
                    >
                        Vote na Comida
                    </Text>
                </View>
                <View className="grid grid-cols-2 w-full px-4 gap-2 md:w-[60vw]">
                    {[
                        {
                            name: 'Curupira',
                        },
                        {
                            name: 'Arroz',
                        },
                        {
                            name: 'Feijão',
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
                            delay={(index + 1) * 100}
                            entering={FadeInLeft}
                            exiting={FadeOutRight}
                            key={item.name}
                            className="flex items-center w-full h-10 col-span-1 px-4 py-2 space-x-4 bg-white rounded-full min-h-10 max-h-10"
                        >
                            <Button className="flex items-center justify-center w-full h-full">
                                <Text className="text-2xl flex-[10] text-center text-gray-800">
                                    {item.name}
                                </Text>
                            </Button>
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
                            Votar em
                        </Text>
                    </ButtonPrimary>
                </View>
            </View>
        </DefaultLayout>
    )
}

export default FoodSecretScreen
