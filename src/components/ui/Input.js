import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
// import { TextInput } from '@react-native-material/core';
const Input = ({ label, textInputConfig }) => {
    const inputStyles = [styles.input];
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    return (
        <>
            <View style={{ marginLeft: 22 }}>
                <Text style={{ fontSize: 20 }}>{label}</Text>
            </View>
            <View>
                <TextInput style={inputStyles} {...textInputConfig} />
            </View>
        </>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputStyles: {
        height: 20,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
});
