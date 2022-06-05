import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import RestaurantDetail from './screens/RestaurantDetail'
import OrderCompleted from './screens/OrderCompleted'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from './constants/colors'
import Search from './screens/Search'
import MainCart from './screens/CartScreen'

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const RootNavigation = () => {
    const HomeScreens = () => (
        <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
            <Stack.Screen name='Home' component={HomeScreen} />
            {/* <Stack.Screen name='RestaurantDetail' component={RestaurantDetail} /> */}
            <Stack.Screen name='OrderCompleted' component={OrderCompleted} />
        </Stack.Navigator>
    )
    const screenOptions = {
        headerShown: false,
    };

    const BrowseScreen = () => (
        <Stack.Navigator initialRouteName='Search' screenOptions={screenOptions}>
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
    )
    const CartScreen = () => (
        <Stack.Navigator initialRouteName='Cart' screenOptions={screenOptions}>
            <Stack.Screen name='Cart' component={MainCart} />
        </Stack.Navigator>
    )
    const AccountScreen = () => (
        <View style={{ flex: 1 }}>
            <Text>Account Screen</Text>
        </View>
    )

    const HomeTabs = () => (
        <Tab.Navigator
            {...TabNavProps}
        >
            <Tab.Screen
                name='HomeTab'
                component={HomeScreens}
                options={options('home')}
            />
            <Tab.Screen
                name='BrowseTab'
                component={BrowseScreen}
                options={options('search')}
            />
            <Tab.Screen
                name='CartTab'
                component={CartScreen}
                options={options('shopping-cart')}
            />
            <Tab.Screen
                name='AccountTab'
                component={AccountScreen}
                options={options('user')}
            />
        </Tab.Navigator>
    )

    const TabNavProps = {
        initialRouteName: 'HomeTab',
        activeColor: colors.black,
        inactiveColor: colors.black,
        barStyle: { backgroundColor: colors.white }
    }
    const options = (icon) => {
        return {
            tabBarLabel: null,
            tabBarIcon: () => (
                <FontAwesome5
                    name={icon}
                    size={25}
                    style={{
                        alignSelf: "center",
                        color: colors.black
                    }}
                />
            )
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                <Stack.Screen name='Home' component={HomeTabs} />
                <Stack.Screen name='RestaurantDetail' component={RestaurantDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation