import type { LOADING } from '~/store/slices/constants'

export type InitialState = {
    isLoading: LOADING
    category: string
}

export const name = 'categories'

export const ON_CHANGE_CATEGORY = 'ON_CHANGE_CATEGORY'
export const ON_CHANGE_CATEGORY_SUCCESS = 'ON_CHANGE_CATEGORY_SUCCESS'
export const ON_CHANGE_CATEGORY_FAIL = 'ON_CHANGE_CATEGORY_FAIL'

export const ACTION_CHANGE_CATEGORY = `${name}/${ON_CHANGE_CATEGORY}`
export const ACTION_CHANGE_CATEGORY_SUCCESS = `${name}/${ON_CHANGE_CATEGORY_SUCCESS}`
export const ACTION_CHANGE_CATEGORY_FAIL = `${name}/${ON_CHANGE_CATEGORY_FAIL}`
