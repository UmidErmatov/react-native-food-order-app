import { View, Text, Image } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const About = ({ route }) => {
    const { categories, image, name, price, rating, reviews } = route.params
    const formattedCategories = categories.map((cat) => cat).join(" • ");
    const description = `${formattedCategories} ${price ? " • " + price : ""
        } • 🎫 • ${rating} ⭐ (${reviews}+)`;

    return (
        <View>
            <RestaurantImage image={image} />
            <RestaurantName name={name} />
            <RestaurantDescription description={description} />
        </View>
    )
}

export default About

const RestaurantImage = ({ image }) => (
    <Image source={{ uri: image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = ({ name }) => (
    <Text
        style={{
            fontSize: 29,
            fontWeight: "600",
            marginTop: 10,
            marginHorizontal: 15,
            color: colors.black
        }}
    >
        {name}
    </Text>
);

const RestaurantDescription = ({ description }) => (
    <Text
        style={{
            marginTop: 10,
            marginHorizontal: 15,
            fontWeight: "400",
            fontSize: 15.5,
        }}
    >
        {description}
    </Text>
);