import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearch, restaurantListAction } from '../../redux/features/search/searchSlice'
import SearchComponent from '../components/searchBar/SearchBar'
import RestaItems from '../components/home/RestaItems'
import { isEmpty } from 'lodash'

const Search = ({ navigation }) => {
    const dispatch = useDispatch()
    const restaurants = useSelector(selectSearch).restaurantList
    const loading = useSelector(selectSearch).loading
    const renderItem = ({ item }) => (
        <RestaItems restaurant={item} onPress={() => onPress(item)} />
    )
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
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <SearchComponent dispatch={dispatch} restaurantsAction={restaurantListAction} loading={loading} restaurants={restaurants} />
            <View>
                {isEmpty(restaurants) ? null :
                    <FlatList
                        style={{
                            // borderWidth: 1,
                            // borderColor: 'red',
                            marginBottom: 60
                        }}
                        data={restaurants}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
    }
})