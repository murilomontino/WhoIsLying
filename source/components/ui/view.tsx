import type React from 'react'
import Animated from 'react-native-reanimated'
import withControl from '../helpers/with-control'

type ViewProps = React.ComponentProps<typeof Animated.View> & {
    condition?: boolean
}

const View = (props: ViewProps) => {
    return <Animated.View {...props} />
}

export default withControl(View)
