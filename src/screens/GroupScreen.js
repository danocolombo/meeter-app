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
const MeetingDetails = ({ route, navigation }) => {
    const meeting = route.params.meeting;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const groups = useSelector((state) => state.meetings.groups);

    const meeter = useSelector((state) => state.system);

    // determin if active or historic
    const historic = isDateDashBeforeToday(meeting.meetingDate);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);
    useEffect(() => {
        if (historic) {
            //check for groups
            dispatch(clearGroups);
            const groups = dispatch(getMeetingGroups(meeting.meetingId));
            printObject('groups:', groups);
            // setGroups(groups);
        }
    }, []);

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
                                {historic ? 'Meal:' : 'Meal Plans:'}
                            </Text>
                        </View>
                        <View>
                            <Text style={mtrTheme.detailsRowValue}>
                                {meeting.meal === '' ? 'TBD' : meeting.meal}
                            </Text>
                        </View>
                        {historic && (
                            <View style={{ marginLeft: 'auto', padding: 10 }}>
                                <Badge size={50} style={mtrTheme.detailsBadge}>
                                    {meeting.mealCount}
                                </Badge>
                            </View>
                        )}
                    </View>
                    {historic && (
                        <View style={styles.row}>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={mtrTheme.detailsRowLabel}>
                                    Attendance:
                                </Text>
                            </View>

                            <View style={{ marginLeft: 'auto', padding: 10 }}>
                                <Badge size={50} style={mtrTheme.detailsBadge}>
                                    {meeting.attendanceCount}
                                </Badge>
                            </View>
                        </View>
                    )}
                    {meeting.newcomersCount > 0 && (
                        <View style={styles.row}>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={mtrTheme.detailsRowLabel}>
                                    Newcomers:
                                </Text>
                            </View>

                            <View style={{ marginLeft: 'auto', padding: 10 }}>
                                <Badge size={50} style={mtrTheme.detailsBadge}>
                                    {meeting.newcomersCount}
                                </Badge>
                            </View>
                        </View>
                    )}
                    {groups.length > 0 && (
                        <View style={styles.row}>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={mtrTheme.detailsRowLabel}>
                                    WE HAVE GROUPS
                                </Text>
                            </View>

                            <View style={{ marginLeft: 'auto', padding: 10 }}>
                                <Badge size={50} style={mtrTheme.detailsBadge}>
                                    {groups.length}
                                </Badge>
                            </View>
                        </View>
                    )}
                    <View>
                        <Text style={{ color: 'white' }}>
                            Groups.length: {groups.length}
                        </Text>
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
        padding: 5,
    },

    dateWrapper: {
        margin: 5,
    },
});
