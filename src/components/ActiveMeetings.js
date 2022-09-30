import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MeetingListCard from './Meeting.List.Card';
import { deleteMeeting } from '../features/meetingsSlice';
import CustomButton from '../components/ui/CustomButton';
import { Pressable } from 'react-native';
import { printObject, asc_sort, desc_sort } from '../utils/helpers';
import { CONFIG } from '../utils/helpers';
// import { Colors } from '../../constants/colors';
const ActiveMeetings = () => {
    const navigation = useNavigation();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [meeting, setMeeting] = useState();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    let me = useSelector((state) => state.users.currentUser);
    let activeMeetings = useSelector((state) => state.meetings.activeMeetings);
    // printObject('SR20 rallies:', rallies);
    // const aMeetings = activeMeetings.filter(
    //     (m) => m.coordinator.id === me.uid && m.affiliate === meeter.affiliation
    // );
    // now sort the rallies
    // function asc_sort(a, b) {
    //     return b.meetingDate - a.meetingDate;
    // }
    // let theMeetings = activeMeetings.sort(asc_sort);
    let displayData;
    async function sortMeetings() {
        displayData = activeMeetings;
        // return displayData;
    }
    sortMeetings()
        .then((results) => {
            //printObject('diplayData-sorted', displayData);
        })
        .catch((err) => {
            console.log('error sorting', err);
        });

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('EditMeeting', {
                            meetingId: meeting.meetingId,
                        })
                    }
                    color='white'
                    title='Edit'
                />
            ),
        });
    }, [navigation, meeter]);
    const handleDeleteConfirm = (meeting) => {
        if (process.env.ENV === 'DEV') {
            console.log('DEV DELETE REQUEST');
            dispatch(deleteMeeting(meeting));
        } else {
            //first delete from db, then remove from redux

            let obj = {
                operation: 'deleteMeeting',
                payload: {
                    Key: {
                        uid: meeting.meetingId,
                    },
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
            //let dbRallies = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, CONFIG)
                .then((response) => {
                    dispatch(deleteMeeting(meeting));
                })
                .catch((err) => {
                    console.log('AM-88: error:', err);
                });
        }
        setShowDeleteConfirm(false);
    };
    const handleDeleteRequest = (meeting) => {
        setShowDeleteConfirm(true);
        setMeeting(meeting);
    };
    const handleEventPress = (e) => {
        printObject('event', e);
    };
    return (
        <View style={styles.rootContainer}>
            <Modal visible={showDeleteConfirm} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <Text style={styles.modalTitle}>
                            Confirm You Want To Delete
                        </Text>
                        <View>
                            <Text>Meeting Information</Text>
                        </View>
                        <View>
                            <Text>NEED MEETING DETAILS</Text>>
                        </View>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalConfirmButton}>
                                <CustomButton
                                    title='CANCEL'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: 'lightgrey',
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() => setShowDeleteConfirm(false)}
                                />
                            </View>
                        </View>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalCancelButton}>
                                <CustomButton
                                    title='DELETE'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => {
                                        handleDeleteConfirm(meeting);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Text> </Text>
                </View>
                <View style={styles.screenHeader}>
                    <Text style={styles.screenHeaderText}>Active Meetings</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Ionicons
                        name='md-add-circle-sharp'
                        size={24}
                        color='white'
                        onPress={() =>
                            navigation.navigate('AddMeeting', {
                                meetingId: 0,
                            })
                        }
                    />
                </View>
            </View>
            {displayData.length > 0 && (
                <View>
                    <View style={styles.infoArea}>
                        <Text>Tap any meeting to see details.</Text>
                    </View>
                </View>
            )}
            <ScrollView>
                {displayData.length < 1 && (
                    <Surface style={styles.noMeetingsSurface}>
                        <View>
                            <Text style={styles.noMeetingsText}>
                                No Active Meetings
                            </Text>
                        </View>
                    </Surface>
                )}
                <View>
                    {displayData.map((mtg) => (
                        <View key={mtg.uid} style={{ margin: 10 }}>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('MeetingInfo', {
                                        meetingId: mtg.meetingId,
                                    })
                                }
                                key={mtg.uid}
                            >
                                <MeetingListCard
                                    key={mtg.uid}
                                    active={true}
                                    // rallyId={ral.uid}
                                    meeting={mtg}
                                    deletePress={handleDeleteRequest}
                                    // date={ral.eventDate}
                                    // locationName={ral.name}
                                    // city={ral.city}
                                    // stateProv={ral.stateProv}
                                />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default ActiveMeetings;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    infoArea: {
        alignItems: 'center',
    },
    noMeetingsSurface: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        marginHorizontal: 40,
        padding: 8,
        justifyContent: 'center',
        height: 100,
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5,
    },
    noMeetingsText: {
        fontSize: 20,
        fontWeight: '500',
    },
    meetingListSurface: {
        marginTop: 10,
        padding: 8,
        width: '80%',
        height: 200,
        justifyContent: 'center',
        elevation: 5,
    },

    buttonContainer: {
        alignItems: 'center',
    },

    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 10,

        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
