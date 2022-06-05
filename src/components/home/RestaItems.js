import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../../constants/colors';

export const localRestaurants = [
    {
        id: 1,
        name: "Beachside Bar",
        image_url:
            "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
        categories: ["Cafe", "Bar"],
        price: "$300",
        reviews: 1244,
        rating: 4.5,
        time: '15 - 35 min'
    },
    {
        id: 2,
        name: "Benihana",
        image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        categories: ["Cafe", "Bar"],
        price: "$350",
        reviews: 1244,
        rating: 3.7,
        time: '15 - 35 min'
    },
    {
        id: 3,
        name: "India's Grill",
        image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        categories: ["Indian", "Bar"],
        price: "$410",
        reviews: 700,
        rating: 4.9,
        time: '15 - 35 min'
    },
];

const RestaItems = ({ restaurant, onPress }) => {
    return (
        <TouchableOpacity
            key={restaurant.id}
            activeOpacity={1}
            style={{ marginBottom: 30 }}
            onPress={onPress}
        >
            <View
                style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
            >
                <RestaurantImage image={restaurant.image_url} />
                <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
            </View>
        </TouchableOpacity>
    )
}

export default RestaItems

const RestaurantImage = ({ image }) => (
    <>
        <Image
            source={{
                uri: image
            }}
            style={{ width: "100%", height: 180 }} />
        <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }} >
            <MaterialCommunityIcons name="heart-outline" size={25} color={colors.white} />
        </TouchableOpacity>
    </>
)

const RestaurantInfo = ({ name, time, rating }) => (
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
        }}
    >
        <View>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: colors.black }}>{name}</Text>
            <Text style={{ fontSize: 13, color: colors.black }}>{time}</Text>
        </View>
        <View
            style={{
                backgroundColor: "#eee",
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
            }}
        >
            <Text style={{ color: colors.black }}>{rating}</Text>
        </View>
    </View>
)