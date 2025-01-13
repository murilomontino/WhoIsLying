import cartoon from './cartoon.json'

export const Category = {
    cartoon,
} as const
export type Category = keyof typeof Category

export type Cartoon = {
    name: string
    genre: string
    year_of_release: number
    brief_description: string
    tags: string[]
    clues: string[]
    difficulty: 0 | 1 | 2 | 3 | 4 | 5
}

export type Categories = Cartoon

export const generateCategories = async <T>(category: Category): Promise<T> => {
    const items = Category[category]
    return items as unknown as T
}
