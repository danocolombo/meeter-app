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
const MeetingDetails = ({ route, navigation }) => {
    const meeting = route.params.meeting;
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
                <View>
                    <Text style={mtrTheme.screenTitle}>
                        {meeting.meetingType}
                    </Text>

                    <View style={styles.firstRow}>
                        <View style={styles.dateWrapper}>
                            <DateBall date={meeting?.meetingDate} />
                        </View>
                        <View>
                            <View style={{ flexDirection: 'column' }}>
                                {meeting.meetingType === 'Lesson' && (
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={mtrTheme.subTitle}>
                                            {meeting.title}
                                        </Text>
                                    </View>
                                )}
                                <View style={{ alignContent: 'flex-start' }}>
                                    <Text style={mtrTheme.detailsTitle}>
                                        {meeting.meetingType === 'Lesson'
                                            ? meeting.supportContact
                                            : meeting.title}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={mtrTheme.detailsRowLabel}>
                                Meal Plans:
                            </Text>
                        </View>
                        <View>
                            <Text style={mtrTheme.detailsRowValue}>
                                {meeting.meal === '' ? 'TBD' : meeting.meal}
                            </Text>
                        </View>
                    </View>
                </View>
            </Surface>
        </>
    );
};
export default withTheme(MeetingDetails);
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
