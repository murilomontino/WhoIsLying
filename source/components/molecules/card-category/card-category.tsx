import React from 'react'
import { ImageBackground, View } from 'react-native'
import Text from '~/components/atoms/text'

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
            style={{
                width: '100%',
                height: 144,
                borderRadius: 8,
                overflow: 'hidden',
            }} // Dimensões e bordas arredondadas
        >
            <View className="flex items-center justify-center flex-grow border-2 border-gray-300 rounded-lg ">
                <Text as="h2" className="text-white ">
                    {title}
                </Text>
            </View>
        </ImageBackground>
    )
}

export default CardCategory
