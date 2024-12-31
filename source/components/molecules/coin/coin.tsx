import React, { useState } from 'react'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'

const Dice3D = ({
    initialWord = 'One',
    finalWord = 'Six',
    words = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
}) => {
    const [side, setSide] = useState(initialWord) // Palavra exibida, agora com a palavra inicial definida pela prop
    const rotationX = useSharedValue(0) // Rotação no eixo X
    const textRotationX = useSharedValue(0) // Rotação do texto no eixo X

    const handleRoll = () => {
        const totalRotations = 5 // Número de giros completos
        const finalRotationX = Math.floor(Math.random() * 360) // Rotação final aleatória no eixo X
        const duration = 5000 // Duração total da animação
        const intervalTime = 100 // Tempo entre alternâncias de palavras
        let currentIndex = 0 // Índice inicial para alternância

        // Alterna palavras rapidamente para o efeito de caça-níquel
        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length // Alterna sequencialmente
            setSide(words[currentIndex]) // Atualiza a palavra exibida
        }, intervalTime)

        // Inicia a animação de rotação do dado
        rotationX.value = withTiming(
            totalRotations * 360 + finalRotationX,
            { duration },
            () => {
                clearInterval(intervalId) // Para a alternância ao final
                runOnJS(setSide)(finalWord) // Define a palavra final a partir da prop
                rotationX.value = 0 // Reseta para o próximo giro
            },
        )

        // Inicia a rotação do texto no eixo X para o efeito de caça-níquel
        textRotationX.value = withTiming(360 * 3, { duration: 5000 }, () => {
            textRotationX.value = 0 // Reseta a rotação do texto após o efeito
        })
    }

    // Estilo animado para o dado
    const animatedStyle = useAnimatedStyle(() => {
        // Limita a rotação entre -90º e 90º para evitar que a palavra fique de cabeça para baixo
        const rotate = rotationX.value % 360
        const adjustedRotation = rotate > 180 ? 360 - rotate : rotate // Ajuste para não ir além de 180º
        return {
            transform: [{ rotateX: `${adjustedRotation}deg` }],
        }
    })

    // Estilo animado para o texto com efeito de caça-níquel no eixo X
    const textAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${textRotationX.value}deg` }], // Apenas rotação no eixo X
        }
    })

    return (
        <Button onPress={handleRoll} className="w-full md:w-1/2">
            <Animated.View
                className="items-center justify-center w-full h-12 px-4 py-8 bg-blue-500 border-4 border-red-500 rounded-full "
                style={[animatedStyle]}
            >
                <Animated.Text
                    className="text-white"
                    style={[
                        textAnimatedStyle,
                        {
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 42,
                            textShadowColor: '#ef4444', // Cor da borda
                            textShadowOffset: { width: 4, height: 4 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        },
                    ]}
                >
                    {side}
                </Animated.Text>
            </Animated.View>
        </Button>
    )
}

export default Dice3D
