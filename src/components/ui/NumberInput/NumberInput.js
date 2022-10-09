import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RoundedButton } from './RoundedButton';
import { useTheme } from 'react-native-paper';
function NumberInput({ value, numberStyle, graphicStyle, onAction }) {
    const mtrTheme = useTheme();
    const inputStyles = [styles.input];

    let numericValue = parseInt(value);
    const increaseValue = () => {
        const newOne = numericValue + 1;
        onAction(newOne);
    };
    const decreaseValue = () => {
        if (numericValue > 0) {
            onAction(numericValue - 1);
        } else {
            onAction(0);
        }
    };

    return (
        <View>
            <View style={styles.rootContainer}>
                <RoundedButton
                    title='-'
                    size={25}
                    textStyle={[
                        {
                            fontSize: 16,
                            alignItems: 'center',
                        },
                        numberStyle,
                    ]}
                    style={{ borderColor: 'white' }}
                    onPress={decreaseValue}
                />
                <View style={[styles.numberBox, graphicStyle]}>
                    <Text style={[styles.number, graphicStyle]}>
                        {numericValue}
                    </Text>
                </View>
                <RoundedButton
                    title='+'
                    size={25}
                    style={{ borderColor: 'white' }}
                    textStyle={{
                        color: graphicStyle.color,
                        fontSize: 16,
                        alignItems: 'center',
                    }}
                    onPress={increaseValue}
                />
            </View>
        </View>
    );
}
export default NumberInput;

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberBox: {
        paddingHorizontal: 10,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: Colors.gray75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontSize: 24,
    },
});
