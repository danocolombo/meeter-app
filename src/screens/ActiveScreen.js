import {
    StyleSheet,
    Text,
    View,
    Button,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ActiveMeetings from '../components/ActiveMeetings';
// import ServeMyRallies from '../../components/serve/ServeMyRallies';

const ActiveScreen = () => {
    const navigation = useNavigation();
    const meeter = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.title,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('EditMeeting', {
                            meetingId: meeting.meetingId,
                        })
                    }
                    // color='white'
                    title='NEW'
                />
            ),
        });
    }, [navigation, meeter]);
    return (
        <>
            <ActiveMeetings />
        </>
    );
};

export default ActiveScreen;

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
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
