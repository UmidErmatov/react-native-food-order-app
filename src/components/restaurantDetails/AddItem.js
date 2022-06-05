import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const AddItem = ({ price, quantity, addFood, subtractFood }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`$${price * quantity}`}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // borderWidth: 2,
                // borderColor: 'red',
                width: '45%'
            }}>
                <Pressable disabled={quantity <= 1} style={[styles.button, { backgroundColor: colors.black }]} onPress={subtractFood}>
                    <Text style={[styles.buttonText, { color: colors.white }]}>-</Text>
                </Pressable>
                <Text style={styles.text}>{quantity}</Text>
                <Pressable style={[styles.button, { backgroundColor: colors.white }]} onPress={addFood}>
                    <Text style={[styles.buttonText, { color: colors.black }]}>+</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default AddItem

const styles = StyleSheet.create({
    container: {
        // borderWidth: 2,
        // borderColor: 'black',
        // height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },
    text: {
        color: colors.black,
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 3,
        // backgroundColor: colors.black,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        // color: colors.white,
    }
})