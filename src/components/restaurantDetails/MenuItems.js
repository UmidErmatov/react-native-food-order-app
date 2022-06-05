import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import colors from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCart } from '../../../redux/features/cart/cartSlice'
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const MenuItems = ({ food, restaurantName, marginLeft, handleSheet, hideCheckbox }) => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)

  const cartItems = cart?.selectedItems?.items
  const isFoodCart = (food, cartItems) => Boolean(cartItems.find(item => item.id === food.id))
  const selectItem = (item, checkboxValue) => dispatch(addToCart({ ...item, restaurantName: restaurantName, checkboxValue: checkboxValue }))


  return (
    <Pressable onPress={() => handleSheet(food)} key={food.id}>
      <View>
        <View style={styles.menuItemStyle}>
          {hideCheckbox ? (
            <></>
          ) : (
            <BouncyCheckbox
              iconStyle={{ borderColor: "lightgray" }}
              fillColor={colors.black}
              isChecked={isFoodCart(food, cartItems)}
              onPress={(checkboxValue) => selectItem(food, checkboxValue)}
            />
          )}
          <FoodInfo food={food} />
          <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
        </View>
        <Divider
          width={0.5}
          orientation='vertical'
          style={{ marginHorizontal: 20 }}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
    color: colors.black
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

const FoodInfo = (props) => (
  <View style={{ width: "60%", justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 80,
        height: 80,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);

export default MenuItems