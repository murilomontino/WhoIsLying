import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LOADING } from '~/store/slices/constants'
import {
    type InitialState,
    ON_CHANGE_CATEGORY,
    ON_CHANGE_CATEGORY_FAIL,
    ON_CHANGE_CATEGORY_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    category: '',
}

const slice = createSlice({
    name,
    initialState,
    reducers: {
        [ON_CHANGE_CATEGORY]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_CATEGORY_SUCCESS]: (
            state,
            action: PayloadAction<{ category: string }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.category = action.payload.category
        },
        [ON_CHANGE_CATEGORY_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
