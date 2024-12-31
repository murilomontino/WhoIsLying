import type React from 'react'
import Animated from 'react-native-reanimated'

export type TextProps = React.ComponentProps<typeof Animated.Text>

const Text = (props: TextProps) => {
    return <Animated.Text {...props} />
}

export default Text
