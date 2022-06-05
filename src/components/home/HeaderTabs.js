import { View, Image, Text } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const HeaderTabs = ({ activeTab, setActiveTab }) => {
    return (
        <View elevation={2} style={{ flexDirection: "row", alignSelf: "center", padding: 5, justifyContent: "space-between", width: '100%', backgroundColor: colors.white }}>
            <Logo />
            <View style={{
                justifyContent: 'center',
            }}
            >
                <Text style={{ color: colors.black }}>All {'>'}</Text>
            </View>
        </View>
    )
}

export default HeaderTabs

const Logo = ({ text, activeTab, btnColor, setActiveTab, textColor }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Image style={{
                width: 40,
                height: 50,
            }}
                resizeMode='cover'
                source={require('../../assets/images/logo.jpg')}
            />
            <Text style={{
                color: colors.black,
                fontSize: 20
            }}>Ildam Food</Text>
        </View>
    )
}