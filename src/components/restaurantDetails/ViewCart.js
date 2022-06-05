import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import colors from '../../constants/colors'
import OrderItem from './OrderItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart } from '../../../redux/features/cart/cartSlice'
import { loadingAction } from '../../../redux/features/app'
import { orderCol } from '../../../services/api'
import { addDoc, serverTimestamp } from 'firebase/firestore/lite'
import LottieView from 'lottie-react-native';

const ViewCart = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const { items, restaurantName } = useSelector(selectCart).selectedItems
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)
    const total = items.map(item => Number(item.price.replace('$', ''))).reduce((prev, current) => prev + current, 0)
    const addOrderToFirebase = () => {
        dispatch(loadingAction({ loading: true }))
        const order = {
            items: items,
            restaurantName: restaurantName,
            timeStamp: serverTimestamp()
        }
        addDoc(orderCol, order).then(() => {
            setTimeout(() => {
                dispatch(loadingAction({ loading: false }))
                navigation.navigate("OrderCompleted");
            }, 2500);
        }).catch(err => console.log('Post err: ', err))
    }

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },

        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 500,
            borderWidth: 1,
        },

        restaurantName: {
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            color: colors.black,
            marginBottom: 10,
        },

        subtotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
        },

        subtotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
        },
    });


    const checkoutModalContent = () => {
        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalCheckoutContainer}>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                    {items.map(item => (
                        <OrderItem key={item.id} item={item} />
                    ))}
                    <View style={styles.subtotalContainer}>
                        <Text style={styles.subtotalText}>Subtotal</Text>
                        <Text>{`$${total}`}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: "black",
                                alignItems: "center",
                                padding: 13,
                                borderRadius: 30,
                                width: 300,
                                position: "relative",
                            }}
                            onPress={() => {
                                addOrderToFirebase()
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 18 }}>Checkout</Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    color: "white",
                                    fontSize: 14,
                                    top: 17,
                                }}
                            >
                                {total ? `$${total}` : ""}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }

    return (<>
        <Modal animationType='slide'
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            {checkoutModalContent()}
        </Modal>
        {total ?
            <View style={{
                // flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                // position: 'absolute',
                // bottom: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <TouchableOpacity style={{
                        // marginTop: 20,
                        backgroundColor: colors.black,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8,
                        borderRadius: 30,
                        width: '100%',
                        // position: 'relative'
                    }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ color: colors.white, fontSize: 20, marginRight: 30 }}>View Cart</Text>
                        <Text style={{ color: colors.white, fontSize: 20 }}>{`$${total}`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            : null}
        {loading ?
            <View
                style={{
                    backgroundColor: "black",
                    position: "absolute",
                    opacity: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <LottieView
                    style={{ height: 200 }}
                    source={require("../../assets/animations/scanner.json")}
                    autoPlay
                    speed={3}
                />
            </View> : null}
    </>
    )
}

export default ViewCart