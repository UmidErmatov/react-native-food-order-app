import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItems: { items: [], restaurantName: "" },
    selectedFood: {},
    lastOrder: {
        items: [
            {
                id: 6,
                title: "Bologna",
                description: "With butter lettuce, tomato and sauce bechamel",
                price: "$13.50",
                image:
                    "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
            },
        ],
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            if (action.payload.checkboxValue) {
                state.selectedItems = {
                    items: [...state.selectedItems.items, action.payload],
                    restaurantName: action.payload.restaurantName
                }
            } else {
                state.selectedItems = {
                    items: [...state.selectedItems.items.filter(item => item.id !== action.payload.id)],
                    restaurantName: action.payload.restaurantName
                }
            }
        },
        lastOrderAction(state, { payload }) {
            state.lastOrder.items = payload.items
        },
        selectFood(state, { payload }) {
            state.selectedFood = payload
        },
        updateCartState(state, { payload }) {
            state = { ...state, payload }
        }
    }
})

export const { addToCart, updateCartState, lastOrderAction, selectFood } = cartSlice.actions
export const selectCart = (state) => state.cart
const cartReducer = cartSlice.reducer
export default cartReducer