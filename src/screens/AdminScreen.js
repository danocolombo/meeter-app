import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Surface, withTheme, useTheme } from 'react-native-paper';
import { printObject } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
const AdminScreen = ({ route, navigation }) => {
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    //const meeter = useSelector((state) => state.system);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    return (
        <>
            <Surface style={styles.surface}>
                <View>
                    <Text>ADMIN</Text>
                </View>
            </Surface>
        </>
    );
};
export default withTheme(AdminScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    dateWrapper: {
        margin: 5,
    },
});
