import { Bangers_400Regular, useFonts } from '@expo-google-fonts/bangers'
import { Text, type TextProps } from 'react-native'

export type TitleProps = TextProps

export default function Title({ className, ...props }: TitleProps) {
    const [fontsLoaded] = useFonts({
        Bangers_400Regular,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <Text
            {...props}
            style={{
                fontFamily: 'Bangers_400Regular',
                fontStyle: 'italic',
                fontSize: 82,
            }}
        >
            Who Is Lying
        </Text>
    )
}
