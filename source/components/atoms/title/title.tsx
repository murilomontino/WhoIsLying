import { Bangers_400Regular, useFonts } from '@expo-google-fonts/bangers'
import type { TextProps } from 'react-native'
import { BounceIn, BounceOutRight } from 'react-native-reanimated'
import View from '~/components/ui/view'
import Text from '../text'

export type TitleProps = TextProps

export default function Title({ className, ...props }: TitleProps) {
    const title = 'Who Is Lying'

    const [fontsLoaded] = useFonts({
        Bangers_400Regular,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View
            entering={BounceIn}
            exiting={BounceOutRight}
            className={`flex flex-row items-center ${className}`}
        >
            {title.split('').map((char: string, index: number) => (
                <Text
                    key={`${char}-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                    }`}
                    as="h1"
                    className="mr-1 italic"
                    style={{
                        color: 'white',
                        transform: [{ translateY: index % 2 === 0 ? -2 : 2 }], // Alterna posição no eixo Y
                    }}
                    {...props}
                >
                    {char}
                </Text>
            ))}
        </View>
    )
}
