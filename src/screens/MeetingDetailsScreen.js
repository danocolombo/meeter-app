import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Platform,
} from 'react-native';
import Constants from 'expo-constants';
// import * as Application from 'expo-application';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import CustomButton from '../components/ui/CustomButton';
import DateBall from '../components/ui/DateBall';
import DateStack from '../components/ui/DateStack';
import { Surface, withTheme, useTheme, Badge } from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import MeetingListCard from '../components/Meeting.List.Card';
const MeetingDetails = ({ route }) => {
    const meeting = route.params.meeting;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const groups = useSelector((state) => state.meetings.groups);
    const [displayGroups, setDisplayGroups] = useState([]);
    const meeter = useSelector((state) => state.system);

    const navigation = useNavigation();
    const activeMeetings = useSelector(
        (state) => state.meetings.activeMeetings
    );
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
            dispatch(clearGroups());
            const groups = dispatch(getMeetingGroups(meeting.meetingId));
            // setGroups(groups);
        }
    }, []);
    useEffect(() => {
        dispatch(clearGroups());
        const groups = dispatch(getMeetingGroups(meeting.meetingId));
    }, [route, isFocused]);
    return (
        <>
            <Surface style={styles.surface}>
                <ScrollView>
                    <View>
                        <Text style={mtrTheme.screenTitle}>
                            {meeting.meetingType}
                        </Text>
                    </View>
                    <View style={styles.firstRow}>
                        <View style={styles.dateWrapper}>
                            {Platform.OS === 'ios' && (
                                <View style={{ padding: 5 }}>
                                    <DateBall date={meeting?.meetingDate} />
                                </View>
                            )}
                            {Platform.OS === 'android' && (
                                <View style={{ padding: 1 }}>
                                    <DateStack date={meeting?.meetingDate} />
                                </View>
                            )}
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
                    <View style={styles.row}>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={mtrTheme.detailsRowLabel}>
                                {historic ? 'Meal:' : 'Meal Plans:'}
                            </Text>
                        </View>
                        <View style={{ flexWrap: true }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 28,
                                }}
                            >
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
                    <View
                        style={{
                            borderTopColor: 'yellow',
                            borderBottomColor: 'yellow',
                            marginHorizontal: 20,
                            marginBottom: 20,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderTopWidth: StyleSheet.hairlineWidth,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                textAlign: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                }}
                            >
                                Open-Share Groups
                            </Text>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                }}
                            >
                                <TouchableOpacity
                                    key={0}
                                    onPress={() =>
                                        navigation.navigate('GroupEdit', {
                                            group: {
                                                groupId: '0',
                                                meetingId: meeting.meetingId,
                                                attendance: '0',
                                                gender: 'x',
                                            },
                                        })
                                    }
                                    style={({ pressed }) =>
                                        pressed && styles.pressed
                                    }
                                >
                                    <FontAwesome5
                                        name='plus-circle'
                                        size={20}
                                        color='white'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {groups.length > 0 && (
                        <FlatList
                            data={groups}
                            keyExtractor={(item) => item.groupId}
                            renderItem={({ item }) => (
                                <GroupListCard group={item} />
                            )}
                        />
                    )}
                </ScrollView>
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
