import { Text, type TextProps } from 'react-native'
import { BounceIn, BounceOutRight } from 'react-native-reanimated'
import View from '~/components/ui/view'

export type TitleProps = TextProps

export default function Title({ className, ...props }: TitleProps) {
    const title = 'Who Is Lying'

    return (
        <View
            {...props}
            entering={BounceIn}
            exiting={BounceOutRight}
            className={`flex flex-row items-center justify-center w-[80vw]  text-center flex-wrap ${className}`}
        >
            <Text
                className="px-1 text-center "
                style={[
                    {
                        fontFamily: 'Bangers_400Regular',
                        color: 'white',
                        fontSize: 72,
                        textShadowColor: '#ef4444',
                        textShadowOffset: { width: -2, height: 2 },
                        textShadowRadius: 10,
                    },
                ]}
            >
                {title}
            </Text>
        </View>
    )
}
