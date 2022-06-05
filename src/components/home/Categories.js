import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const items = [
    { id: 1, image: require('../../assets/images/shopping-bag.png'), text: "Pick up" },
    { id: 2, image: require('../../assets/images/soft-drink.png'), text: "Soft drinks" },
    { id: 3, image: require('../../assets/images/bread.png'), text: "Bakery items" },
    { id: 4, image: require('../../assets/images/fast-food.png'), text: "Fast foods" },
    { id: 5, image: require('../../assets/images/deals.png'), text: "Deals" },
    { id: 6, image: require('../../assets/images/coffee.png'), text: "Coffee & Tea" },
    { id: 7, image: require('../../assets/images/desserts.png'), text: "Desserts" },
]

const Categories = () => {
    const renderItem = ({ item }) => (
        <View key={item.id} style={{ alignItems: "center", marginRight: 30 }}>
            <Image
                source={item.image}
                style={{
                    width: 50,
                    height: 40,
                    resizeMode: "contain",
                }}
            />
            <Text style={{ fontSize: 12, fontWeight: "900", color: colors.black }}>{item.text}</Text>
        </View>
    )
    return (
        <View
            style={{
                marginTop: 5,
                backgroundColor: colors.white,
                paddingVertical: 10,
                paddingLeft: 20,
            }}
        >
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map(item => (
                    <View key={item.id} style={{ alignItems: "center", marginRight: 30 }}>
                        <Image
                            source={item.image}
                            style={{
                                width: 50,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{ fontSize: 12, fontWeight: "900", color: colors.black }}>{item.text}</Text>
                    </View>
                ))}
            </ScrollView> */}

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
            />
        </View>
    )
}

export default Categories