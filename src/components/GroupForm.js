import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from './ui/Input';
import GenderSelectors from './GenderSelectors';
import CustomButton from './ui/CustomButton';
import NumberInput from './ui/NumberInput/NumberInput';
import { printObject } from '../utils/helpers';
import { updateGroupValues } from '../features/meetingsSlice';
const GroupForm = ({ route, group }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    // printObject('GF:11-->group', group);
    const [values, setValeus] = useState({
        meetingId: group.meetingId,
        groupId: group.groupId,
        gender: group.gender,
        title: group.title ? group.title : '',
        attendance: group.attendance ? group.attendance : '0',
        location: group.location ? group.location : '',
        facilitator: group.facilitator ? group.facilitator : '',
        cofacilitator: group.cofacilitator ? group.cofacilitator : '',
        notes: group.notes ? group.notes : '',
    });
    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValeus((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }
            if (inputIdentifier === 'location') {
                if (enteredValue.length < 3) {
                    setIsLocationValid(false);
                } else {
                    setIsLocationValid(true);
                }
            }
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    function setGenderValue(enteredValue) {
        setValeus((curInputValues) => {
            return {
                ...curInputValues,
                gender: enteredValue,
            };
        });
    }
    const handleFormSubmit = () => {
        //   handle SAVE request

        dispatch(updateGroupValues(values));
        navigation.navigate('GroupDetails', {
            group: values,
        });
    };
    const inputStyle = {
        paddingLeft: 0,
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 10,
    };
    // printObject('GF:50-->values', values);
    return (
        <>
            <View style={styles.formContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 5,
                    }}
                >
                    <GenderSelectors
                        setPick={setGenderValue}
                        pick={values.gender}
                    />
                </View>
                <View>
                    <NumberInput
                        value={values.attendance}
                        onAction={inputChangedHandler.bind(this, 'attendance')}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Group Title'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            value: values.title,
                            paddingHorizontal: 10,
                            fontSize: 24,
                            color: 'black',
                            marginHorizontal: 20,
                            placeholder: 'Group Title',
                            style: { color: 'white' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'title'
                            ),
                        }}
                    />
                </View>
                {!isTitleValid && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>minimum length = 3</Text>
                    </View>
                )}
                <View style={styles.rowStyle}>
                    <Input
                        label='Location'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 10,
                            value: values.location,
                            fontSize: 24,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'where was group?',
                            style: { color: 'white' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'location'
                            ),
                        }}
                    />
                </View>
                {!isLocationValid && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>minimum length = 3</Text>
                    </View>
                )}
                <View style={styles.rowStyle}>
                    <Input
                        label='Faciliatator'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 10,
                            fontSize: 24,
                            value: values.facilitator,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'who facilitated?',
                            style: { color: 'white' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'facilitator'
                            ),
                        }}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Co-Faciliatator'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 10,
                            fontSize: 24,
                            value: values.cofacilitator,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'who co-facilitated?',
                            style: { color: 'white' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'cofacilitator'
                            ),
                        }}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Notes'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 10,
                            fontSize: 24,
                            color: 'black',
                            value: values.notes,
                            capitalize: 'sentence',
                            autoCorrect: true,
                            marginHorizontal: 20,
                            placeholder: '',
                            style: { color: 'white' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            multiline: true,
                            minHeight: 100,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'notes'
                            ),
                        }}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        text='SAVE'
                        bgColor='blue'
                        fgColor='white'
                        type='PRIMARY'
                        enabled={isTitleValid && isLocationValid}
                        onPress={handleFormSubmit}
                    />
                </View>
            </View>
        </>
    );
};

export default GroupForm;

const styles = StyleSheet.create({
    formContainer: {
        //marginTop: 10,
    },
    rowStyle: {
        marginTop: 5,
    },
    errorContainer: {
        marginTop: 2,
        marginLeft: 20,
    },
    errorText: {
        color: 'red',
        fontWeight: '700',
    },
    buttonContainer: { marginTop: 10, marginHorizontal: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
});
