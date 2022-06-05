import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import MenuItems from '../components/restaurantDetails/MenuItems';
import { getDocs, orderBy, limit, query } from 'firebase/firestore/lite';
import { orderCol } from '../../services/api';
import { lastOrderAction, selectCart } from '../../redux/features/cart/cartSlice';
import colors from '../constants/colors';

const OrderCompleted = () => {
    const dispatch = useDispatch()
    const { lastOrder } = useSelector(selectCart)
    const { items, restaurantName } = useSelector(selectCart).selectedItems;
    const renderItem = ({ item }) => (
        <MenuItems food={item} hideCheckbox={true} marginLeft={10} />
    )

    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);

    useEffect(() => {
        const q = query(orderCol, orderBy('timeStamp', 'desc'), limit(1))
        getDocs(q).then((snapshot) => {
            snapshot.docs.map(doc => {
                dispatch(lastOrderAction({ ...doc.data() }))
            })
        })
    }, []);

    return (
        <>
            <View
                style={{
                    margin: 15,
                    alignItems: "center",
                    height: "100%",
                    backgroundColor: colors.white,
                }}
            >
                <LottieView
                    style={{ height: 80, alignSelf: "center", marginBottom: 10 }}
                    source={require("../assets/animations/check-mark.json")}
                    autoPlay
                    speed={0.5}
                    loop={false}
                />
                <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.black, marginBottom: 10 }}>
                    Your order at {restaurantName} has been placed for {`$${total}`}
                </Text>
                <View style={{
                    height: "45%"
                }}>
                    <FlatList
                        data={lastOrder.items}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <LottieView
                    style={{ height: 188, alignSelf: "center" }}
                    source={require("../assets/animations/cooking.json")}
                    autoPlay
                    speed={0.5}
                />
            </View>
        </>
    )
}

export default OrderCompleted