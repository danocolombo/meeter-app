import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
const DateChip = ({ date }) => {
    const mtrTheme = useTheme();
    if (!date) {
        return null;
    }
    //   YYYY-MM-DD get rid of dashes
    // console.log('date:', date);
    const parts = date.split('-');
    const yr = parts[0];
    const mo = parts[1];
    const da = parts[2];
    let month = '';
    switch (mo) {
        case '01':
            month = 'JAN';
            break;
        case '02':
            month = 'FEB';
            break;
        case '03':
            month = 'MAR';
            break;
        case '04':
            month = 'APR';
            break;
        case '05':
            month = 'MAY';
            break;
        case '06':
            month = 'JUN';
            break;
        case '07':
            month = 'JUL';
            break;
        case '08':
            month = 'AUG';
            break;
        case '09':
            month = 'SEP';
            break;
        case '10':
            month = 'OCT';
            break;
        case '11':
            month = 'NOV';
            break;
        case '12':
            month = 'DEC';
            break;
        default:
            break;
    }
    let day = da.slice(0, 1);
    if (day === '0') {
        day = da.slice(1, 2);
    } else {
        day = da;
    }
    return (
        <View>
            <View style={mtrTheme.dateChipContainer}>
                <View style={{ margin: 0, paddingTop: 10 }}>
                    <Text style={mtrTheme.dateChipNonDayText}>{month}</Text>
                </View>
                <View style={{ margin: 0, padding: 0 }}>
                    <Text style={mtrTheme.dateChipDayText}>{da}</Text>
                </View>
                <View style={{ margin: 0, paddingBottom: 10 }}>
                    <Text style={mtrTheme.dateChipNonDayText}>{yr}</Text>
                </View>
            </View>
        </View>
    );
};
export default DateChip;
