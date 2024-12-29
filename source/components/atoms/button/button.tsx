import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { tv } from 'tailwind-variants'

type ButtonProps = TouchableOpacityProps

const button = tv({
    base: `
        bg-blue-500 px-4 py-8 w-full rounded-full items-center justify-center h-12
    `,
    variants: {
        disabled: {
            true: 'bg-gray-500 opacity-70', // Aplica um tom de cinza quando desabilitado
        },
    },
})

const buttonWithoutClass = tv({
    base: `
        
    `,
    variants: {
        disabled: {
            true: 'bg-gray-500 opacity-70 rounded-lg', // Aplica um tom de cinza quando desabilitado
        },
    },
})

export function Button({ className, disabled, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            disabled={disabled}
            className={buttonWithoutClass({ className, disabled })}
        />
    )
}

export function ButtonPrimary({ className, disabled, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            disabled={disabled}
            className={button({ className, disabled })}
        />
    )
}

export function ButtonSecondary({ className, disabled, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            disabled={disabled}
            className={button({ className, disabled })}
        />
    )
}
