import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useTheme, withTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MeetingCardDate from './ui/Meeting.Card.Date';
import { printObject } from '../utils/helpers';
const MeetingListCard = ({ meeting }) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    printObject('mtrTheme:', mtrTheme);
    function meetingPressHandler() {
        // if the user is registered, take them to registerForm

        navigation.navigate('MeetingDetails', {
            meeting: meeting,
        });
    }
    return (
        <>
            <Pressable
                onPress={meetingPressHandler}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={styles.rootContainer}>
                    <View
                        style={[
                            styles.meetingItem,
                            { backgroundColor: mtrTheme.colors.primary },
                        ]}
                    >
                        <View style={styles.firstRow}>
                            <View style={styles.dateWrapper}>
                                <MeetingCardDate date={meeting?.meetingDate} />
                            </View>
                            <View
                                style={
                                    {
                                        // borderWidth: 1,
                                        // borderColor: 'white',
                                        // width: '75%',
                                    }
                                }
                            >
                                <View style={{ flexDirection: 'column' }}>
                                    <View>
                                        <Text
                                            style={mtrTheme.meetingCardTypeText}
                                        >
                                            {meeting.meetingType}
                                        </Text>
                                    </View>
                                    <View
                                        style={{ alignContent: 'flex-start' }}
                                    >
                                        <Text
                                            style={
                                                mtrTheme.meetingCardTitleText
                                            }
                                        >
                                            {meeting.title}
                                        </Text>
                                    </View>
                                    {meeting.meetingType === 'Lesson' && (
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.meetingCardPersonText
                                                }
                                            >
                                                {meeting.supportContact}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
};

export default withTheme(MeetingListCard);

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    rootContainer: {
        marginHorizontal: 5,
    },
    meetingItem: {
        marginVertical: 5,
        paddingBottom: 5,
        backgroundColor: 'darkgrey',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'yellow',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    firstRow: {
        flexDirection: 'row',
    },
    dateWrapper: {
        margin: 5,
    },
    // dataWrapper: {
    //     flexDirection: 'column',
    // },
    col1: {
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 10,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    eventDateWrapper: {
        // paddingTop: 5,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },

    eventTimeWrapper: {
        marginTop: 5,
        marginBottom: 5,
        // paddingHorizontal: 0,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    eventTime: {
        // marginLeft: 5,
        // marginRight: 30,
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
    },
    registeredWrapper: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: 'green',
        alignItems: 'center',
    },
    registeredText: { color: 'white', fontSize: 10 },
    col2: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    locationWrapper: {
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
    },
    locationText: {
        width: '100%',
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'lightgrey',
    },
    hostWrapper: {
        paddingLeft: 25,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    hostName: {
        // marginLeft: 20,
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'lightgrey',
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-start',
    },
});
