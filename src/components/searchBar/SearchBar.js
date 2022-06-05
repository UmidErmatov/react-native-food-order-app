import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import colors from '../../constants/colors'
import { SearchBar } from '@rneui/themed'
import { getDocs, query, where } from 'firebase/firestore/lite';
import { restaurantCol } from '../../../services/api';
import { debounce } from 'lodash';
import { loadingSearch } from '../../../redux/features/search/searchSlice';

const SearchComponent = ({ dispatch, restaurantsAction, loading, restaurants }) => {
    const [value, setValue] = useState('')

    const onChangeSearch = debounce(value => {
        value ? dispatch(loadingSearch(true)) : null
        const q = query(restaurantCol, where('name', '>=', value), where('name', '<=', `${value}\uf8ff`))
        getDocs(q).then((snapshot) => {
            let data = []
            snapshot.docs.map(doc => {
                data.push(doc.data())
            })
            dispatch(restaurantsAction(value ? data : restaurants))
            dispatch(loadingSearch(false))
        }).catch(err => console.log('Get restaurants error: ', err))
    }, 500)
    return (
        <View style={styles.container} elevation={20}>
            <SearchBar
                placeholder='Search for restaurants'
                placeholderTextColor={colors.black}
                onChangeText={val => { setValue(val); onChangeSearch(val) }}
                value={value}
                showLoading={loading}
                round
                lightTheme
                platform='android'
                inputContainerStyle={{
                    borderWidth: 1,
                    borderColor: colors.black,
                    borderRadius: 30,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        // flex: 1,
        // borderWidth: 1,
        // borderColor: 'blue'
    }
})

export default SearchComponent