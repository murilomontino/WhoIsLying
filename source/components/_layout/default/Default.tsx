import type React from 'react'
import { View } from 'react-native'

type DefaultLayoutProps = {
    children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <View className="flex items-center justify-start flex-1 py-4 space-y-4 overflow-y-auto bg-emerald-400">
            {children}
        </View>
    )
}

export default DefaultLayout
