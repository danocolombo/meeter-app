import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HistoricScreen from '../screens/HistoricScreen';
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
            initialRouteName='ActiveMeetings'
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name='HistoricMeetings'
                component={HistoricScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Active',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='AdminScreen'
                component={AdminScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Active',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ActiveMeetings'
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
