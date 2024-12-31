import cn from 'classnames'
import React, { startTransition, useState } from 'react'
import {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import View from '~/components/ui/view'

const color = {
    init: '#fff',
    middle: '#181818',
    final: '#fff',
}

const bg = {
    init: '#3b82f6',
    middle: '#181818',
    final: '#3b82f6',
}

type Dice3DProps = {
    initialWord?: string
    finalWord?: string
    words?: string[]
    onFinally?: () => void
}

const Dice3D = ({
    initialWord = 'One',
    finalWord = 'Six',
    words = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
    onFinally,
}: Dice3DProps) => {
    const [colorText, setColorText] = useState(color.init) // Cor do texto
    const [bgColor, setBgColor] = useState(bg.init) // Cor de fundo
    const [side, setSide] = useState(initialWord) // Palavra exibida, agora com a palavra inicial definida pela prop
    const rotationX = useSharedValue(0) // Rotação no eixo X
    const textRotationX = useSharedValue(0) // Rotação do texto no eixo X

    const handleRoll = () => {
        startTransition(() => {
            setColorText(color.middle) // Muda a cor do texto para vermelho
        })
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
                startTransition(() => {
                    setBgColor(bg.middle) // Muda a cor de fundo para preto
                })
                setTimeout(() => {
                    runOnJS(setSide)(finalWord) // Define a palavra final a partir da prop
                    startTransition(() => {
                        setBgColor(bg.final) // Muda a cor de fundo para azul
                        setColorText(color.final) // Muda a cor do texto para vermelho
                        onFinally?.() // Executa a função final, se existir
                    })
                }, 750) // Aguarda um tempo para exibir a palavra final
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
        <Button
            hasSound={false}
            onPress={handleRoll}
            className="items-center justify-center w-full md:w-1/2"
        >
            <View
                className="items-center justify-center w-[50vw] h-20 px-4 py-8 border-4 border-gray-500 rounded-lg "
                style={[
                    animatedStyle,
                    {
                        backgroundColor: bgColor,
                    },
                ]}
            >
                <Text
                    as="h2"
                    className={cn({
                        'text-shadow-outlined-red':
                            colorText === color.final || colorText === color.init,
                    })}
                    style={[
                        textAnimatedStyle,
                        {
                            color: colorText,
                        },
                    ]}
                >
                    {side}
                </Text>
            </View>
        </Button>
    )
}

export default Dice3D
