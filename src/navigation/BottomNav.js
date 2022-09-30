import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HistoryScreen from '../screens/HistoryScreen';
import ActiveScreen from '../screens/ActiveScreen';
import AdminScreen from '../screens/AdminScreen';
const BottomTab = createBottomTabNavigator();
const MeetingsConfig = () => {
    let user = useSelector((state) => state.users.currentUser);
    let director = false;
    if (user.affiliations.active.role === 'director') {
        director = true;
    }
    return (
        <BottomTab.Navigator
            initialRouteName='ServeMy'
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name='History'
                component={HistoryScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'History',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Admin'
                component={AdminScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Admin',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={size} color={color} />
                    ),
                }}
            />{' '}
            <BottomTab.Screen
                name='Active'
                component={ActiveScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Active',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={size} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default MeetingsConfig;
