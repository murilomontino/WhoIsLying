import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import { FadeIn, FadeInRight, FadeOut, FadeOutRight } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import { Button } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import CardCategory from '~/components/molecules/card-category'
import type { ImgCategory } from '~/components/molecules/card-category/card-category'
import GoBack from '~/components/molecules/go-back'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
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
    {
        title: 'Music',
        category: 'music',
    },
    {
        title: 'Series',
        category: 'series',
    },
    {
        title: 'Random',
        category: 'random',
    },
] as const

const CategoriesScreen = () => {
    const dispatch = useAppDispatch()
    const { round } = useAppSelector((state) => state.game)
    const router = useRouter()

    const handleCategory = (category: string) => {
        dispatch(onChangeCategory({ category }))
        router.push(`/pre-start/${round}`)
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
            <ScrollView
                contentContainerStyle={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 16,
                }}
                style={{ flex: 1 }} // Garante que o ScrollView ocupe o espaço disponível
            >
                {categories.map((category, index) => (
                    <View
                        key={category.category}
                        delay={(index + 1) * 100}
                        entering={FadeInRight.duration(450)}
                        exiting={FadeOutRight.duration(450)}
                        className="flex-grow m-1 w-1/3 max-w-[44vw]  md:max-w-[30vw]"
                    >
                        <Button
                            disabled={!category.active}
                            onPress={() => handleCategory(category.category)}
                        >
                            <CardCategory
                                title={category.title}
                                category={category.category}
                            />
                        </Button>
                    </View>
                ))}
            </ScrollView>
        </DefaultLayout>
    )
}

export default CategoriesScreen
