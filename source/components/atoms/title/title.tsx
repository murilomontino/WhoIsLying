import { Bangers_400Regular, useFonts } from '@expo-google-fonts/bangers'
import { Text, type TextProps, View } from 'react-native'

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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {title.split('').map((char: string, index: number) => (
                <Text
                    key={index}
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        fontStyle: 'italic',
                        fontSize: 82,
                        color: 'white',
                        textShadowColor: 'black', // Cor da borda
                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                        marginRight: 4,
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
