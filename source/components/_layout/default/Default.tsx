import cn from 'classnames'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import type React from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'

type DefaultLayoutProps = {
    children: React.ReactNode
    className?: string
}

SplashScreen.preventAutoHideAsync()

const DefaultLayout = ({ children, className }: DefaultLayoutProps) => {
    const [loaded, error] = useFonts({
        Bangers_400Regular: require('../../../../assets/fonts/Bangers_400Regular.ttf'),
    })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if (!loaded && !error) {
        return null
    }
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
