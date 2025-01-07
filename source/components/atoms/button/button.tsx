import {
    type GestureResponderEvent,
    TouchableOpacity,
    type TouchableOpacityProps,
} from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { tv } from 'tailwind-variants'
import withControl, { type ControlProps } from '~/components/helpers/with-control'
import withDelay from '~/components/helpers/with-delay'
import useSound from '~/components/hooks/use-sound'
type ShadowProps = {
    shadowColor: string
    shadowOffset: {
        width: number
        height: number
    }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
}

type ButtonProps = TouchableOpacityProps & {
    delay?: number
    hasSound?: boolean
    shadow?: ShadowProps | null
} & ControlProps

const button = tv({
    base: `
        opacity-90 hover:opacity-100 disabled:hover:opacity-70
        px-4 py-1 md:py-8 rounded-full items-center justify-center md:h-12 
        border-2 border-red-400 w-full
    `,
    variants: {
        disabled: {
            true: '!bg-gray-500 !border-gray-200 opacity-40', // Aplica um tom de cinza quando desabilitado
        },
        color: {
            primary: 'bg-blue-500  !text-white',
            secondary: 'bg-white border-red-500',
        },
    },
})

const buttonWithoutClass = tv({
    base: `
        opacity-90 hover:opacity-100 transition-opacity
    `,
    variants: {
        disabled: {
            true: 'bg-gray-500 opacity-70 rounded-lg', // Aplica um tom de cinza quando desabilitado
        },
    },
})

function Btn({
    className,
    shadow,
    disabled,
    hasSound = true,
    ...props
}: ButtonProps) {
    const { playClickSound } = useSound({ sound: 'click', volume: 0.2 })

    const handlePress = (event: GestureResponderEvent) => {
        if (hasSound) playClickSound()

        props.onPress?.(event)
    }

    return (
        <TouchableOpacity
            {...props}
            onPress={handlePress}
            style={[props.style, shadow]}
            disabled={disabled}
            className={buttonWithoutClass({ className, disabled })}
        />
    )
}

export const Button = withControl(withDelay(Btn))

export function ButtonPrimary({ className, disabled, ...props }: ButtonProps) {
    return (
        <Shadow
            distance={7}
            startColor={'#ef4444'}
            style={[{ borderRadius: 100 }]}
            offset={[1, 1]}
        >
            <Button
                {...props}
                disabled={disabled}
                className={button({ className, disabled, color: 'primary' })}
            />
        </Shadow>
    )
}

export function ButtonSecondary({ className, disabled, ...props }: ButtonProps) {
    return (
        <Shadow
            distance={10}
            startColor={'#ef4444'}
            style={{ borderRadius: 100 }}
            offset={[1, 1]}
        >
            <Button
                {...props}
                disabled={disabled}
                className={button({ className, disabled, color: 'secondary' })}
            />
        </Shadow>
    )
}
