import { Slot } from 'expo-router'

// Import your global CSS file
import '../global.css'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _Layout() {
    return (
        <SafeAreaView
            edges={['top']}
            className="flex flex-1 w-full"
            
        >
                <StatusBar backgroundColor="#09b285" translucent animated />
                <Slot />
        </SafeAreaView>
    )
}