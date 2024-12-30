import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import DefaultLayout from '~/components/_layout/default'
import { Button } from '~/components/atoms/button'
import Title from '~/components/atoms/title'
import CardCategory from '~/components/molecules/card-category'
import type { ImgCategory } from '~/components/molecules/card-category/card-category'
import { useAppDispatch } from '~/store/hooks'
import { onChangeCategory } from '~/store/slices/categories/actions'

type Category = {
    title: string
    category: ImgCategory
    active?: boolean
}

const categories: Category[] = [
    {
        title: 'Cartoon',
        category: 'cartoon',
        active: true,
    },
    {
        title: 'Anime',
        category: 'anime',
    },
    {
        title: 'Movie',
        category: 'movie',
    },
    {
        title: 'Game',
        category: 'game',
    },
] as const

const CategoriesScreen = () => {
    const dispatch = useAppDispatch()

    const handleCategory = (category: string) => {
        dispatch(onChangeCategory({ category }))
    }

    return (
        <DefaultLayout>
            <Link href="/" asChild>
                <Button className="w-1/2">
                    <Text
                        className="gap-2 space-x-2 text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 24,
                            textShadowColor: 'black', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        <AntDesign
                            name="back"
                            size={24}
                            className="mr-2 text-white"
                        />
                        Voltar
                    </Text>
                </Button>
            </Link>
            <Title />
            <Text
                className="text-center text-gray-800"
                style={{
                    fontFamily: 'Bangers_400Regular',
                    fontSize: 42,
                    textShadowColor: 'white', // Cor da borda
                    textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                    textShadowRadius: 2, // Raio para suavizar a sombra
                }}
            >
                Categorias
            </Text>
            <View className="flex flex-row flex-wrap justify-center">
                {categories.map((category) => (
                    <Button
                        key={category.category}
                        disabled={!category.active}
                        onPress={() => handleCategory(category.category)}
                        style={{ margin: 8 }}
                    >
                        <CardCategory
                            title={category.title}
                            category={category.category}
                        />
                    </Button>
                ))}
            </View>
        </DefaultLayout>
    )
}

export default CategoriesScreen
