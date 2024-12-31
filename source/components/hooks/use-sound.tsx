import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'

const Sounds = {
    click: require('../../../assets/sounds/click-sound.mp3'),
} as const
type Sounds = keyof typeof Sounds

type UseSoundProps = {
    sound: Sounds
}

const useSound = ({ sound: uriSound }: UseSoundProps) => {
    const [clickSound, setClickSound] = useState<Audio.Sound>()
    const sound = Sounds[uriSound] || Sounds.click
    // Carregar os sons
    async function loadSounds() {
        if (!sound) return
        const click = await Audio.Sound.createAsync(
            sound, // Coloque seu arquivo de som
        )
        await click.sound.setVolumeAsync(0.1) // Ajustando o volume para 50%
        setClickSound(click.sound)
    }

    // Tocar o som de clique
    const playClickSound = () => {
        clickSound?.playAsync()
    }

    useEffect(() => {
        loadSounds()
        return () => {
            // Limpar os sons quando o componente for desmontado
            clickSound?.unloadAsync()
        }
    }, [])

    return { playClickSound }
}

export default useSound
