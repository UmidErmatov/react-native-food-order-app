import React, { useRef, useState } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import About from '../components/restaurantDetails/About';
import MenuItems from '../components/restaurantDetails/MenuItems';
import { Divider } from '@rneui/base';
import ViewCart from '../components/restaurantDetails/ViewCart';
import { useSelector, useDispatch } from 'react-redux';
// import BottomSheetComp from '../components/utilComponents/BottomSheet';
import ItemDetails from '../components/restaurantDetails/ItemDetails';
import { selectFood } from '../../redux/features/cart/cartSlice';

const RestaurantDetail = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const sheetRef = useRef(null)
    const handleSheet = (food) => {
        dispatch(selectFood(food))
        sheetRef?.current?.snapTo('60%')
    }
    const renderSheetContent = () => (
        <ItemDetails />
    )
    const { foods } = useSelector(state => state.app)
    const renderItem = ({ item }) => (
        <MenuItems food={item} restaurantName={route.params.name} sheetRef={sheetRef} handleSheet={handleSheet} />
    )

    return (
        <View style={styles.container}>
            <About route={route} />
            <Divider width={1.8} style={{ marginVertical: 20 }} />
            <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
            {/* <BottomSheetComp sheetRef={sheetRef} renderContent={renderSheetContent} /> */}
            <ViewCart navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'gray',
    }
})

export default RestaurantDetail