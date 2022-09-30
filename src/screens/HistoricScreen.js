import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const HistoricScreen = () => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('MeeterEdit', {
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
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>HISTORIC</Text>
                </View>
            </Surface>
        </>
    );
};

export default HistoricScreen;

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
