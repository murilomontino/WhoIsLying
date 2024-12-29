import { createAction } from '@reduxjs/toolkit'

import {
    ACTION_CHANGE_CATEGORY,
    ACTION_CHANGE_CATEGORY_FAIL,
    ACTION_CHANGE_CATEGORY_SUCCESS,
} from './types'

export const onChangeCategory = createAction<{ category: string }>(
    ACTION_CHANGE_CATEGORY,
)
export const onChangeCategorySuccess = createAction<{ category: string }>(
    ACTION_CHANGE_CATEGORY_SUCCESS,
)
export const onChangeCategoryFail = createAction(ACTION_CHANGE_CATEGORY_FAIL)
