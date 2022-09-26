import React from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from '../screens/MainScreen';

import LandingScreen from '../screens/LandingScreen';
import MeeterSignOut from '../screens/MeeterSignOut';

//import { Colors } from '../constants/colors';
import { printObject } from '../utils/helpers';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AuthDrawer = (navigation) => {
    const user = useSelector((state) => state.users.currentUser);
    const feo = useSelector((state) => state.system);
    // printObject('PF:17-->user', user);
    let manager = false;
    if (
        user?.affiliations?.active?.role === 'lead' ||
        user?.affiliations?.active?.role === 'director' ||
        user?.affiliations?.active?.role === 'superuser'
    ) {
        manager = true;
    }
    let patron = false;
    if (
        user?.affiliations?.active?.role === 'rep' ||
        user?.affiliations?.active?.role === 'lead' ||
        user?.affiliations?.active?.role === 'director' ||
        user?.affiliations?.active?.role === 'superuser'
    ) {
        patron = true;
    }
    // {user?.stateRep || user?.stateLead || user?.superuser} : (
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Colors.primary,
                },
                tabBarActiveTintColor: 'white',
            })}
        >
            <Drawer.Screen
                name='Landing'
                component={LandingScreen}
                options={({ navigation }) => ({
                    title: feo.appName,
                    drawerLabel: 'Home',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />

            <Stack.Screen name='Logout' component={PateSignOut} />
        </Drawer.Navigator>
    );
};

export default AuthDrawer;
