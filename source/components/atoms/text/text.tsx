import React from 'react'
import { type VariantProps, tv } from 'tailwind-variants'
import withControl from '~/components/helpers/with-control'
import AnimatedText, {
    type TextProps as AnimatedTextProps,
} from '~/components/ui/text'

const text = tv({
    base: `
        font-bold font-bangers text-gray-800
    `,
    variants: {
        as: {
            h1: 'text-7xl',
            h2: 'text-5xl',
            h3: 'text-4xl',
            h4: 'text-3xl',
            h5: 'text-2xl',
            h6: 'text-xl',
            subtitle: 'text-sm',
            body: 'text-2xl',
            caption: 'text-xs',
            overline: 'text-xs',
        },
    },
    defaultVariants: {
        as: 'body',
    },
})

type TextProps = AnimatedTextProps &
    VariantProps<typeof text> & {
        condition?: boolean
    }

const Text = ({ className, ...props }: TextProps) => {
    return (
        <AnimatedText
            {...props}
            className={text({
                className: className as string,
                as: props.as,
            })}
        />
    )
}

export default withControl(Text)
