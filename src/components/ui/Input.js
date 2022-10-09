import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
// import { TextInput } from '@react-native-material/core';
const Input = ({ label, labelColor, textInputConfig }) => {
    const inputStyles = [styles.input];
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    return (
        <>
            <View style={styles.inputContainer}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, color: labelColor }}>
                        {label}
                    </Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <TextInput style={inputStyles} {...textInputConfig} />
                </View>
            </View>
        </>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputStyles: {
        height: 20,
        minWidth: 500,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    inputContainer: {},
});
