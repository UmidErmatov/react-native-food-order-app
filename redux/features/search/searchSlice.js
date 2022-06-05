import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurantList: [],
    loading: false
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        restaurantListAction(state, { payload }) {
            state.restaurantList = payload
        },
        loadingSearch(state, { payload }) {
            state.loading = payload
        }
    }
})

export const { restaurantListAction, loadingSearch } = searchSlice.actions
export const selectSearch = state => state.search
const searchReducer = searchSlice.reducer
export default searchReducer