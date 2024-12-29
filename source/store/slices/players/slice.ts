import { createSlice } from '@reduxjs/toolkit'

import { LOADING } from '~/store/slices/constants'

import { type InitialState, name } from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    players: [],
}

const slice = createSlice({
    name,
    initialState,
    reducers: {},
})

export default slice.reducer
