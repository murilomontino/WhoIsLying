import { createSlice } from '@reduxjs/toolkit'

import { LOADING } from '~/store/slices/constants'
import {
    type InitialState,
    ON_ADD_SKILL_HISTORIC,
    ON_ADD_SKILL_HISTORIC_FAIL,
    ON_ADD_SKILL_HISTORIC_SUCCESS,
    ON_BALANCE_CHANGE,
    ON_BALANCE_CHANGE_FAIL,
    ON_BALANCE_CHANGE_SUCCESS,
    ON_BUY_SKILL,
    ON_BUY_SKILL_FAIL,
    ON_BUY_SKILL_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
}

const slice = createSlice({
    name,
    initialState,
    reducers: {
        [ON_BUY_SKILL]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_BUY_SKILL_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
        },
        [ON_BUY_SKILL_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_BALANCE_CHANGE]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_BALANCE_CHANGE_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
        },
        [ON_BALANCE_CHANGE_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_ADD_SKILL_HISTORIC]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_ADD_SKILL_HISTORIC_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
        },
        [ON_ADD_SKILL_HISTORIC_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
