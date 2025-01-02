import {
    type GestureResponderEvent,
    TouchableOpacity,
    type TouchableOpacityProps,
} from 'react-native'
import { tv } from 'tailwind-variants'
import withControl from '~/components/helpers/with-control'
import withDelay from '~/components/helpers/with-delay'
import useSound from '~/components/hooks/use-sound'

type ButtonProps = TouchableOpacityProps & {
    condition?: boolean
    delay?: number
    hasSound?: boolean
}

const button = tv({
    base: `
        shadow-lg
        px-4 py-8 w-full rounded-full items-center justify-center h-12 border-4 
    `,
    variants: {
        disabled: {
            true: 'bg-gray-500 opacity-70', // Aplica um tom de cinza quando desabilitado
        },
        color: {
            primary: 'bg-blue-500 border-red-500',
            secondary: 'bg-white border-red-500',
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

function Btn({ className, disabled, hasSound = true, ...props }: ButtonProps) {
    const { playClickSound } = useSound({ sound: 'click', volume: 0.2 })

    const handlePress = (event: GestureResponderEvent) => {
        if (hasSound) playClickSound()

        props.onPress?.(event)
    }

    return (
        <TouchableOpacity
            {...props}
            onPress={handlePress}
            disabled={disabled}
            className={buttonWithoutClass({ className, disabled })}
        />
    )
}

export const Button = withControl(withDelay(Btn))

export function ButtonPrimary({ className, disabled, ...props }: ButtonProps) {
    return (
        <Button
            {...props}
            disabled={disabled}
            className={button({ className, disabled, color: 'primary' })}
        />
    )
}

export function ButtonSecondary({ className, disabled, ...props }: ButtonProps) {
    return (
        <Button
            {...props}
            disabled={disabled}
            className={button({ className, disabled, color: 'secondary' })}
        />
    )
}
