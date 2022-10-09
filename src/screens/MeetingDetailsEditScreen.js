import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Button,
} from 'react-native';
import Input from '../components/ui/Input';
// import * as Application from 'expo-application';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import GroupList from '../components/GroupList';

import DateBall from '../components/ui/DateBall';
import DateStack from '../components/ui/DateStack';
import { Surface, withTheme, useTheme, Badge } from 'react-native-paper';
import {
    printObject,
    isDateDashBeforeToday,
    todayMinus60,
} from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import MeetingListCard from '../components/Meeting.List.Card';
import TypeSelectors from '../components/TypeSelectors';
const MeetingDetailsEditScreen = ({ route }) => {
    const meeting = route.params.meeting;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);
    const groups = useSelector((state) => state.meetings.groups);
    const [modalMeetingDateVisible, setModalMeetingDateVisible] =
        useState(false);
    const [meetingDate, setMeetingDate] = useState();
    const dashDate =
        meeter.today.substr(0, 3) +
        '-' +
        meeter.today.substr(4, 5) +
        '-' +
        meeter.today.substr(6, 7);
    const dateParts = dashDate.split('-');
    const mtgCompKey =
        meeter.affiliation.toLowerCase() +
        '#' +
        dateParts[0] +
        '#' +
        dateParts[1] +
        '#' +
        dateParts[2];
    const [values, setValues] = useState({
        childrenCount: meeting.childrenCount,
        transportationContact: meeting.transportationContact,
        mealCount: meeting.mealCount,
        meal: meeting.meal,
        greeterContact2: meeting.greeterContact2,
        nurseryCount: meeting.nurseryCount,
        greeterContact1: meeting.greeterContact1,
        securityContact: meeting.securityContact,
        announcementsContact: meeting.announcementsContact,
        attendanceCount: meeting.attendanceCount,
        meetingId: meeting.meetingId,
        mealContact: meeting.mealContact,
        closingContact: meeting.closingContact,
        notes: meeting.notes,
        cafeCount: meeting.cafeCount,
        youthCount: meeting.youthCount ? meeting.youthCount : 0,
        cafeContact: meeting.cafeContact ? meeting.cafeContact : '',
        setupContact: meeting.setupContact ? meeting.setupContact : '',
        meetingDate: meeting.meetingDate ? meeting.meetingDate : dashDate,
        clientId: meeting.clientId ? meeting.clientId : meeter.affiliation,
        donations: meeting.donations ? meeting.donations : 0,
        youthContact: meeting.youthContact ? meeting.youthContact : '',
        nurseryContact: meeting.murseryContact ? meeting.nurseryContact : '',
        cleanupContact: meeting.cleanupContact ? meeting.cleanupContact : '',
        resourceContact: meeting.resourceContact ? meeting.resourceContact : '',
        childrenContact: meeting.childrenContact ? meeting.childrenContact : '',
        newcomersCount: meeting.newcomersCount ? meeting.newcomersCount : 0,
        mtgCompKey: meeting.mtgCompKey ? meeting.mtgCompKey : mtgCompKey,
        facilitatorContact: meeting.facilitatorContact
            ? meeting.facilitatorContact
            : '',
        transportationCount: meeting.transportationCount
            ? meeting.transportationContact
            : 0,
        worship: meeting.worship ? meeting.worship : '',
        avContact: meeting.avContact ? meeting.avContact : '',
        supportContact: meeting.supportContact ? meeting.supportContact : '',
        meetingType: meeting.meetingType ? meeting.meetingType : '',
        title: meeting.title ? meeting.title : '',
    });
    const [isTitleValid, setIsTitleValid] = useState(true);
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }

            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    const navigation = useNavigation();
    const activeMeetings = useSelector(
        (state) => state.meetings.activeMeetings
    );
    // determin if active or historic
    const historic = isDateDashBeforeToday(meeting.meetingDate);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);

    useEffect(() => {
        //set dateObject from meeting
        // we should have values.meetingDate as string YYYY-MM-DD"
        const dateParts = values.meetingDate.split('-');
        let tmpDate = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2],
            0,
            0,
            0
        );
        setMeetingDate(tmpDate);
    }, [route, isFocused]);
    const FormatEventDate = (data) => {
        let dateString =
            data.getMonth() +
            1 +
            '-' +
            data.getDate() +
            '-' +
            data.getFullYear() +
            ' ';
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const tmp = new Date(yr, mo, da, 0, 0, 0);
        // save the date value for control
        setMeetingDate(tmp);
        //make string to save in values.
        let mtgDateString =
            data.getFullYear() +
            '-' +
            (data.getMonth() + 1) +
            '-' +
            data.getDate();
        const newValues = {
            ...values,
            meetingDate: mtgDateString,
        };
        setValues(newValues);
        printObject('MDES:144-->newValues:', newValues);
        return;
    };
    const onMeetingDateCancel = (data) => setModalMeetingDateVisible(false);
    const onMeetingDateConfirm = (data) => {
        FormatEventDate(data);
        setModalMeetingDateVisible(false);
    };
    const handleTypeChange = (value) => {
        const newValues = {
            ...values,
            meetingType: value,
        };
        setValues(newValues);
    };
    // printObject('MDS:58-->meeting:', meeting);
    return (
        <>
            <Surface style={styles.surface}>
                <View
                    style={[
                        styles.firstRow,
                        {
                            borderColor: 'white',
                            borderWidth: 1,
                        },
                    ]}
                >
                    <TypeSelectors
                        pick={values.meetingType}
                        setPick={handleTypeChange}
                    />
                </View>

                <View style={styles.firstRow}>
                    <TouchableOpacity
                        onPress={() => setModalMeetingDateVisible(true)}
                    >
                        <View style={styles.dateWrapper}>
                            {Platform.OS === 'ios' && (
                                <View style={{ padding: 5 }}>
                                    <DateBall date={values.meetingDate} />
                                </View>
                            )}
                            {Platform.OS === 'android' && (
                                <View style={{ padding: 1 }}>
                                    <DateStack date={values.meetingDate} />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            {meeting.meetingType === 'Lesson' && (
                                <Input
                                    label='Lesson'
                                    labelColor='white'
                                    textInputConfig={{
                                        backgroundColor: 'lightgrey',
                                        value: values.title,
                                        paddingHorizontal: 1,
                                        fontSize: 24,
                                        color: 'black',
                                        marginHorizontal: 10,
                                        placeholder: 'Lesson Title',
                                        // style: { color: 'white' },
                                        fontWeight: '300',
                                        letterSpacing: 0,
                                        onChangeText: inputChangedHandler.bind(
                                            this,
                                            'title'
                                        ),
                                    }}
                                />
                            )}
                            {meeting.supportContact && (
                                <Input
                                    label='Contact'
                                    labelColor='white'
                                    textInputConfig={{
                                        backgroundColor: 'lightgrey',
                                        value: values.supportContact,
                                        paddingHorizontal: 1,
                                        fontSize: 24,
                                        color: 'black',
                                        marginHorizontal: 10,
                                        placeholder: 'Contact',
                                        fontWeight: '300',
                                        letterSpacing: 0,
                                        onChangeText: inputChangedHandler.bind(
                                            this,
                                            'supportContact'
                                        ),
                                    }}
                                />
                            )}
                            {/* <View style={{ alignContent: 'flex-start' }}>
                                <Text style={mtrTheme.detailsTitle}>
                                    {meeting.meetingType === 'Lesson'
                                        ? meeting.supportContact
                                        : meeting.title}
                                </Text>
                            </View> */}
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={mtrTheme.detailsRowLabel}>
                            {historic ? 'Meal:' : 'Meal Plans:'}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 2 }}>
                        <Text style={mtrTheme.detailsRowValue}>
                            <Input
                                label='Contact'
                                labelColor=''
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    value: values.meal,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    color: 'black',
                                    marginHorizontal: 10,
                                    placeholder: 'Meal',
                                    fontWeight: '300',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'meal'
                                    ),
                                }}
                            />
                        </Text>
                    </View>
                    {historic && (
                        <View style={{ marginLeft: 'auto', padding: 10 }}>
                            <Badge size={30} style={mtrTheme.detailsBadge}>
                                {meeting.mealCount}
                            </Badge>
                        </View>
                    )}
                </View>

                {historic && (
                    <View style={styles.row}>
                        <View>
                            <Text style={mtrTheme.detailsRowLabel}>
                                Attendance:
                            </Text>
                        </View>

                        <View style={{ marginLeft: 'auto', padding: 10 }}>
                            <Badge size={30} style={mtrTheme.detailsBadge}>
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
                            <Badge size={30} style={mtrTheme.detailsBadge}>
                                {meeting.newcomersCount}
                            </Badge>
                        </View>
                    </View>
                )}

                <DateTimePickerModal
                    isVisible={modalMeetingDateVisible}
                    date={meetingDate}
                    mode='date'
                    value={meetingDate}
                    onConfirm={onMeetingDateConfirm}
                    onCancel={onMeetingDateCancel}
                />
            </Surface>
        </>
    );
};
export default withTheme(MeetingDetailsEditScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },

    dateWrapper: {
        margin: 5,
    },
});
