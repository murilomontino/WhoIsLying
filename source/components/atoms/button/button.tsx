import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { tv } from 'tailwind-variants'

type ButtonProps = TouchableOpacityProps

const button = tv({
    base: `
        px-4 py-8 w-full rounded-full items-center justify-center h-12 border-4 
    `,
    variants: {
        disabled: {
            true: 'bg-gray-500 opacity-70', // Aplica um tom de cinza quando desabilitado
        },
        color: {
            primary: 'bg-blue-500 border-red-500',
            secondary: 'bg-gray-500 border-white',
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
            className={button({ className, disabled, color: 'primary' })}
        />
    )
}

export function ButtonSecondary({ className, disabled, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            disabled={disabled}
            className={button({ className, disabled, color: 'secondary' })}
        />
    )
}
