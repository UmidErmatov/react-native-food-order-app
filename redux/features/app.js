import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore/lite';

const initialState = {
    foods: [
        {
            id: 1,
            title: "Lasagna",
            quantity: 1,
            description: "With butter lettuce, tomato and sauce bechamel",
            price: "$13.50",
            image:
                "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
        },
        {
            id: 2,
            title: "Tandoori Chicken",
            quantity: 1,
            description:
                "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
            price: "$19.20",
            image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
        },
        {
            id: 3,
            title: "Chilaquiles",
            quantity: 1,
            description:
                "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
            price: "$14.50",
            image:
                "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
        },
        {
            id: 4,
            title: "Chicken Caesar Salad",
            quantity: 1,
            description:
                "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
            price: "$21.50",
            image:
                "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
        },
        {
            id: 5,
            title: "Lasagna",
            quantity: 1,
            description: "With butter lettuce, tomato and sauce bechamel",
            price: "$13.50",
            image:
                "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
        },
    ],
    restaurants: [],
    hideCheckbox: false,
    loading: false
}

const fetchOrderedItems = createAsyncThunk(
    'app/fetchOrderedItems',
    async () => {
        const orderCol = collection(db, 'orders')
        const q = query(orderCol, orderBy('timeStamp', 'desc'), limit(1))
        await getDocs(q)
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        loadingAction(state, { payload }) {
            state.loading = payload?.loading
        },
        restaurantsAction(state, { payload }) {
            state.restaurants = payload
        },
        updateFoodAction(state, { payload }) {
            const { id, quantity } = payload
            state.foods.map(food => {
                if (food.id === id) {
                    food.quantity = quantity
                }
            })
            // const selectedFood = state.foods.find(food => food.id === payload?.id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderedItems.pending, (state, { payload }) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchOrderedItems.fulfilled, (state, { payload }) => {
            state.loading = 'succeeded'
            state.foods = payload?.foods
            state.hideCheckbox = payload?.hideCheckbox
        })
        builder.addCase(fetchOrderedItems.rejected, (state, { payload }) => {
            state.loading = 'failed'
        })
    }
})

const appReducer = appSlice.reducer
export const fetchOrder = fetchOrderedItems
export const { loadingAction, restaurantsAction, updateFoodAction } = appSlice.actions
export const appStates = (state) => state.app
export default appReducer