import type { Cartoon } from './cartoon'
import cartoon from './cartoon'
export const Category = {
    cartoon,
} as const
export type Category = keyof typeof Category

export type Categories = Cartoon

export const generateCategories = async <T>(category: Category): Promise<T> => {
    const items = Category[category]
    return items as unknown as T
}
