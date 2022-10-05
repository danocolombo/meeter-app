import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './ui/Input';
import GenderSelectors from './GenderSelectors';
import NumberInput from './ui/NumberInput/NumberInput';
import { Button } from 'react-native-paper';
const GroupForm = ({ route, navigation, group }) => {
    const meeter = useSelector((state) => state.system);

    const [values, setValeus] = useState({
        gender: group.gender,
        title: group.title,
        attendance: group.attendance,
        location: group.location,
        facilitator: group.facilitator,
        cofacilitator: group.cofacilitator,
        notes: group.notes,
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValeus((curInputValues) => {
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
    const inputStyle = {
        paddingLeft: 0,
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 10,
    };
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
                            padding: 10,
                            fontSize: 24,
                            color: 'black',
                            marginHorizontal: 20,
                            placeholder: 'Group Title',
                            style: { color: 'white' },
                            fontWeight: '600',
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'title'
                            ),
                        }}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Location'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            value: values.location,
                            fontSize: 24,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'where was group?',
                            style: { color: 'white' },
                            fontWeight: '600',
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'location'
                            ),
                        }}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Faciliatator'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            fontSize: 24,
                            value: values.facilitator,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'who facilitated?',
                            style: { color: 'white' },
                            fontWeight: '600',
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
                            padding: 10,
                            fontSize: 24,
                            value: values.cofacilitator,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'who co-facilitated?',
                            style: { color: 'white' },
                            fontWeight: '600',
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
                            padding: 10,
                            fontSize: 24,
                            color: 'black',
                            value: values.notes,
                            capitalize: 'sentence',
                            autoCorrect: true,
                            marginHorizontal: 20,
                            placeholder: '',
                            style: { color: 'white' },
                            fontWeight: '600',
                            multiline: true,
                            minHeight: 100,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'notes'
                            ),
                        }}
                    />
                </View>
                <View>
                    <Button
                        style={styles.button}
                        onPress={() => Alert.alert('Simple Button pressed')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '600',
                            }}
                        >
                            SAVE
                        </Text>
                    </Button>
                </View>
            </View>
        </>
    );
};

export default GroupForm;

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
    },
    rowStyle: {
        marginTop: 5,
    },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
});
