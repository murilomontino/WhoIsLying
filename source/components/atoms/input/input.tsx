import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins'
import { TextInput, type TextInputProps } from 'react-native'
import { tv } from 'tailwind-variants'

export type InputProps = TextInputProps

const input = tv({
    base: `
        border border-gray-400 rounded-full px-4 py-1 bg-white text-gray-600
    `,
})

export default function Input({ className, ...props }: InputProps) {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <TextInput
            {...props}
            className={input({ className })}
            style={{
                fontFamily: 'Poppins_400Regular',
            }}
        />
    )
}
