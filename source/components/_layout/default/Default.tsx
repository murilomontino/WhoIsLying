import cn from 'classnames'
import type React from 'react'
import { View } from 'react-native'

type DefaultLayoutProps = {
    children: React.ReactNode
    className?: string
}

const DefaultLayout = ({ children, className }: DefaultLayoutProps) => {
    return (
        <View
            className={cn(
                'flex items-center justify-start flex-1 py-4 space-y-4 overflow-y-auto bg-emerald-400',
                className,
            )}
        >
            {children}
        </View>
    )
}

export default DefaultLayout
