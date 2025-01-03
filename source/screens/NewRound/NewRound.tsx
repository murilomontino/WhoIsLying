import { BounceIn, BounceOut, FadeIn, FadeOut } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { Button, ButtonPrimary, ButtonSecondary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'

const NewRoundScreen = () => {
    const handleContinue = () => {
        // router.push('/result')
    }

    return (
        <DefaultLayout className="items-center justify-center">
            <GoBack />
            <View
                delay={100}
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
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <ButtonSecondary
                    onPress={handleContinue}
                    className="w-full md:w-1/2"
                >
                    <Text as="h3">Escolher Categoria</Text>
                </ButtonSecondary>
            </View>
            <View
                delay={100}
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <ButtonPrimary onPress={handleContinue} className="w-full md:w-1/2">
                    <Text as="h3" className="!text-white text-shadow-outlined-red">
                        Continuar
                    </Text>
                </ButtonPrimary>
            </View>
            <View
                delay={100}
                entering={BounceIn.duration(1000)}
                exiting={BounceOut.duration(1000)}
                className="flex flex-row items-center justify-center w-full px-4 space-x-4"
            >
                <Button
                    onPress={handleContinue}
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
