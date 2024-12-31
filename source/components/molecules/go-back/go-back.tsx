import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'

type GoBackProps = {
    href?: string
}

const GoBack = ({ href }: GoBackProps) => {
    const router = useRouter()

    const goBack = () => {
        if (href) {
            return router.navigate(href)
        }

        if (router.canGoBack()) {
            return router.back()
        }

        return router.navigate('/')
    }

    return (
        <View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            className="absolute top-0 left-0 rounded-full w-fit"
        >
            <Button
                onPress={goBack}
                className="px-4 m-4 bg-red-500 rounded-full w-fit"
            >
                <Text className="gap-2 space-x-2 text-white" as="body">
                    <AntDesign name="back" size={24} className="mr-2 text-white" />
                    Voltar
                </Text>
            </Button>
        </View>
    )
}

export default GoBack
