import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import Input from './ui/Input';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const GroupForm = ({ route, navigation }) => {
    const meeter = useSelector((state) => state.system);
    const [title, setTitle] = useState('');
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
                        justifyContent: 'space-around',
                    }}
                >
                    <BouncyCheckbox
                        size={25}
                        fillColor='red'
                        unfillColor='#FFFFFF'
                        text='Men'
                        iconStyle={{ borderColor: 'red' }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                        onPress={(isChecked: boolean) => {}}
                    />
                    <BouncyCheckbox
                        size={25}
                        fillColor='red'
                        unfillColor='#FFFFFF'
                        text='Women'
                        iconStyle={{ borderColor: 'red' }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                        onPress={(isChecked: boolean) => {}}
                    />
                    <BouncyCheckbox
                        size={25}
                        fillColor='red'
                        unfillColor='#FFFFFF'
                        text='Mixed'
                        iconStyle={{ borderColor: 'red' }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                        onPress={(isChecked: boolean) => {}}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Group Title'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            fontSize: 24,
                            color: 'black',
                            marginHorizontal: 20,
                            placeholder: 'Group Title',
                            style: { color: 'white' },
                            fontWeight: '600', // placeholder: 'Group Title',
                        }}
                        onChangeText={(title) => setTitle(title)}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Location'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            fontSize: 24,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'where was group?',
                            style: { color: 'white' },
                            fontWeight: '600', // placeholder: 'Group Title',
                        }}
                        onChangeText={(title) => setTitle(title)}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Faciliatator'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            fontSize: 24,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'who facilitated?',
                            style: { color: 'white' },
                            fontWeight: '600', // placeholder: 'Group Title',
                        }}
                        onChangeText={(title) => setTitle(title)}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Input
                        label='Co-Faciliatator'
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            fontSize: 24,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 20,
                            placeholder: 'who co-facilitated?',
                            style: { color: 'white' },
                            fontWeight: '600', // placeholder: 'Group Title',
                        }}
                        onChangeText={(title) => setTitle(title)}
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
                            capitalize: 'sentence',
                            marginHorizontal: 20,
                            placeholder: '',
                            style: { color: 'white' },
                            fontWeight: '600',
                            multiline: true, // placeholder: 'Group Title',
                        }}
                        onChangeText={(title) => setTitle(title)}
                    />
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
        marginTop: 10,
    },
});