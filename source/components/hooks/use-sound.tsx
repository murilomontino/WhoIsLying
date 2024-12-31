import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'

const Sounds = {
    click: require('../../../assets/sounds/click-sound.mp3'),
    'click-button': require('../../../assets/sounds/click-button.mp3'),
    suspense: require('../../../assets/sounds/suspense.mp3'),
    win: require('../../../assets/sounds/win.mp3'),
    lose: require('../../../assets/sounds/lose.mp3'),
    reveal: require('../../../assets/sounds/reveal.mp3'),
} as const
type Sounds = keyof typeof Sounds

type UseSoundProps = {
    sound: Sounds
    volume?: number
}

const useSound = ({ sound: uriSound, volume = 0.5 }: UseSoundProps) => {
    const [clickSound, setClickSound] = useState<Audio.Sound>()
    const sound = Sounds[uriSound] || Sounds.click
    // Carregar os sons
    async function loadSounds() {
        if (!sound) return
        const click = await Audio.Sound.createAsync(
            sound, // Coloque seu arquivo de som
        )
        await click.sound.setVolumeAsync(volume) // Ajustando o volume para 50%
        setClickSound(click.sound)
    }

    // Tocar o som de clique
    const playClickSound = () => {
        clickSound?.playAsync()
    }

    // Função para fazer o fade out do som
    const stopClickSound = ({
        delay = 0,
        fadeDuration = 2000,
    }: { delay: number; fadeDuration?: number }) => {
        if (!clickSound) return
        // Primeiro, aguarda o delay para começar o fade out
        setTimeout(() => {
            // Gradualmente diminui o volume até 0
            let currentVolume = volume
            const fadeOutInterval = setInterval(async () => {
                currentVolume -= 0.05 // Ajuste o decremento para controlar a velocidade do fade out
                if (currentVolume > 0) {
                    await clickSound.setVolumeAsync(currentVolume)
                } else {
                    clearInterval(fadeOutInterval)
                    await clickSound.stopAsync() // Para o som após o fade out
                }
            }, fadeDuration / 20) // Controla a suavidade do fade
        }, delay)
    }

    useEffect(() => {
        loadSounds()
        return () => {
            // Limpar os sons quando o componente for desmontado
            clickSound?.unloadAsync()
        }
    }, [])

    return { playClickSound, clickSound, stopClickSound }
}

export default useSound
