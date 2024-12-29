import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { tv } from 'tailwind-variants'

type ButtonProps = TouchableOpacityProps

const button = tv({
    base: `
        bg-blue-500 px-4 py-8 w-full rounded-full items-center justify-center h-12
    `,
})

export function Button({ className, ...props }: ButtonProps) {
    return <TouchableOpacity {...props} />
}

export function ButtonPrimary({ className, ...props }: ButtonProps) {
    return <TouchableOpacity {...props} className={button({ className })} />
}

export function ButtonSecondary({ className, ...props }: ButtonProps) {
    return <TouchableOpacity {...props} className={button({ className })} />
}
