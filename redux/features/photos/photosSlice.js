import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: 'idle',
    photos: [],
    error: ''
}

const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/photos')
            .then((res) => res?.data[0]);
    }
)

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPhotos.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.photos = action.payload
            state.error = ''
        })
        builder.addCase(fetchPhotos.rejected, (state, action) => {
            state.loading = 'failed'
            state.photos = []
            state.error = action.error.message
        })
    }
})

const photosReducer = photosSlice.reducer
export const fetchingPhotos = fetchPhotos
export const photosStates = (state) => state.photos
export default photosReducer