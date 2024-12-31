import type React from 'react'
import Animated from 'react-native-reanimated'
import withControl from '../helpers/with-control'
import withDelay from '../helpers/with-delay'

export type ViewProps = React.ComponentProps<typeof Animated.View> & {
    condition?: boolean
    delay?: number
}

const View = (props: ViewProps) => {
    return <Animated.View {...props} />
}

export default withControl(withDelay(View))
