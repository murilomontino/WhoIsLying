import { useRouter } from 'expo-router'
import React from 'react'
import { FadeIn, FadeInRight, FadeOut, FadeOutRight } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import CardCategory from '~/components/molecules/card-category'
import type { ImgCategory } from '~/components/molecules/card-category/card-category'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
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
    const router = useRouter()
    const handleCategory = (category: string) => {
        dispatch(onChangeCategory({ category }))
        router.push('/pre-start')
    }

    return (
        <DefaultLayout>
            <GoBack />
            <Title />
            <Text
                entering={FadeIn.duration(1000)}
                exiting={FadeOut.duration(1000)}
                className="text-center text-gray-800"
                as="h2"
            >
                Categorias
            </Text>
            <View className="flex flex-row flex-wrap justify-start">
                {categories.map((category, index) => (
                    <View
                        key={category.category}
                        delay={(index + 1) * 100}
                        entering={FadeInRight.duration(450)}
                        exiting={FadeOutRight.duration(450)}
                    >
                        <Button
                            disabled={!category.active}
                            onPress={() => handleCategory(category.category)}
                            style={{ margin: 8 }}
                        >
                            <CardCategory
                                title={category.title}
                                category={category.category}
                            />
                        </Button>
                    </View>
                ))}
            </View>
        </DefaultLayout>
    )
}

export default CategoriesScreen
