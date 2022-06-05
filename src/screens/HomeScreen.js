import { View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderTabs from '../components/home/HeaderTabs';
import Categories from '../components/home/Categories';
import RestaItems from '../components/home/RestaItems'
import colors from '../constants/colors';
import { restaurantsAction, appStates } from '../../redux/features/app';
import { restaurantCol } from '../../services/api';
import { getDocs } from 'firebase/firestore/lite';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const restaurants = useSelector(appStates).restaurants
    const [activeTab, setActiveTab] = useState("Delivery");

    useEffect(() => {
        getDocs(restaurantCol).then((snapshot) => {
            let data = []
            snapshot.docs.map(doc => {
                data.push(doc.data())
            })
            dispatch(restaurantsAction(data))
        }).catch(err => console.log('Get restaurants error: ', err))
    }, [])

    const onPress = (item) => {
        navigation.navigate("RestaurantDetail", {
            name: item.name,
            image: item.image_url,
            price: item.price,
            reviews: item.reviews,
            rating: item.rating,
            categories: item.categories,
        })

    }

    const renderItem = ({ item }) => (
        <RestaItems restaurant={item} onPress={() => onPress(item)} />
    )

    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={{ backgroundColor: colors.white, padding: 15 }}>
                <HeaderTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
            {!isEmpty(restaurants) ?
                <FlatList
                    ListHeaderComponent={<Categories />}
                    data={restaurants}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                /> :
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size={60} color={colors.black} />
                </View>
            }
        </SafeAreaView>
    )
}

export default HomeScreen