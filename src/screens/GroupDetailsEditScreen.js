import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import { Surface, withTheme, useTheme } from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
import { Style } from 'domelementtype';
const GroupDetailsEditScreen = ({ route, navigation }) => {
    const group = route.params.group;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    return (
        <>
            <Surface style={styles.surface}>
                <View
                    style={{
                        width: '95%',
                        height: '100%',

                        backgroundColor: 'white',
                    }}
                >
                    <View
                        style={{
                            margin: 4,
                            borderWidth: 1,
                            boderColor: 'black',
                            width: 'auto',
                            height: '100%',
                        }}
                    >
                        <View
                            style={{
                                margin: 2,
                                borderWidth: 1,
                                boderColor: 'black',
                                width: 'auto',
                                height: '100%',
                            }}
                        >
                            <Text>GROUP DETAILS</Text>
                        </View>
                    </View>
                </View>
            </Surface>
        </>
    );
};
export default withTheme(GroupDetailsEditScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
        alignItems: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },

    dateWrapper: {
        margin: 5,
    },
});
