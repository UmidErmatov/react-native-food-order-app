import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import { Divider } from '@rneui/base'
import colors from '../../constants/colors'
import AddItem from './AddItem'
import ViewCart from './ViewCart'
import { useDispatch, useSelector } from 'react-redux';
import { updateFoodAction } from '../../../redux/features/app'

const ItemDetails = () => {
    const food = useSelector(state => state.cart).selectedFood
    // console.log('food: ', food.quantity);
    const [foodCounter, setFoodCounter] = useState(food.quantity)
    const dispatch = useDispatch()
    const price = Number(food?.price?.replace('$', ''))
    const addFood = () => {
        // setFoodCounter(foodCounter + 1)
        dispatch(updateFoodAction({ id: food.id, quantity: food.quantity + 1 }))
    }
    const subtractFood = () => {
        // setFoodCounter(foodCounter - 1)
        dispatch(updateFoodAction({ id: food.id, quantity: food.quantity - 1 }))
    }
    console.log("gggg: ", food);
    return (
        <View style={styles.container}>
            <FoodImage image={food.image} />
            <FoodName name={food.title} />
            <Divider />
            <AddItem price={price} addFood={addFood} subtractFood={subtractFood} quantity={food.quantity} />
            <ViewCart />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        // flex: 1,
        height: '100%',
        // borderWidth: 2,
        // borderColor: 'red',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
})

const FoodImage = ({ image }) => (
    <Image source={{ uri: image }} resizeMode='cover'
        style={{
            width: "100%",
            height: 200,
            // borderWidth: 2,
            // borderColor: 'green'
        }}
    />
);

const FoodName = ({ name }) => (
    <Text
        style={{
            fontSize: 24,
            fontWeight: "600",
            // marginVertical: 10,
            marginHorizontal: 5,
            color: colors.black,
            // borderWidth: 2,
            // borderColor: 'blue',
        }}
    >
        {name}
    </Text>
);

export default ItemDetails