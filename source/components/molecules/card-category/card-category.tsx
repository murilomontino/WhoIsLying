import React from 'react'
import { ImageBackground, Text, View } from 'react-native'

const ImgCategoryUri = {
    cartoon: require('../../../../assets/images/categories/desenho-animado.jpeg'),
} as const
export type ImgCategory = keyof typeof ImgCategoryUri

type CardCategoryProps = {
    title: string
    category: ImgCategory
}

const CardCategory = ({ title, category }: CardCategoryProps) => {
    return (
        <ImageBackground
            source={ImgCategoryUri[category]} // Caminho da imagem
            resizeMode="cover" // Ajusta a imagem para cobrir todo o card
            style={{ width: 144, height: 144, borderRadius: 8, overflow: 'hidden' }} // Dimensões e bordas arredondadas
        >
            <View className="flex items-center justify-center border-2 border-gray-300 rounded-lg w-36 h-36">
                <Text
                    style={{
                        fontFamily: 'Bangers_400Regular',
                        fontSize: 32,
                        textShadowColor: '#181818', // Cor da borda
                        textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                        textShadowRadius: 2, // Raio para suavizar a sombra
                    }}
                    className="text-xl text-white"
                >
                    {title}
                </Text>
            </View>
        </ImageBackground>
    )
}

export default CardCategory
