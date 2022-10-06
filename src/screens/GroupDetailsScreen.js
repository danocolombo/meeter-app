import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Button,
    StyleSheet,
    Image,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import { Surface, withTheme, useTheme } from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
import { Style } from 'domelementtype';
const GroupDetailsScreen = ({ route, navigation }) => {
    const group = route.params.group;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Back',
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('GroupEdit', {
                            group: group,
                        })
                    }
                    color={'white'}
                    // color={mtrTheme.navButtonLight}
                    title='Edit'
                />
            ),
        });
    }, [navigation, meeter]);

    return (
        <>
            <Surface style={styles.surface}>
                <View
                    style={{
                        width: '95%',
                        height: '100%',

                        backgroundColor: mtrTheme.backgroundColor,
                    }}
                >
                    <View
                        style={{
                            margin: 4,
                            borderWidth: 1,
                            borderColor: '#FEDB39',
                            width: 'auto',
                            height: 'auto',
                        }}
                    >
                        <View
                            style={{
                                margin: 2,
                                borderWidth: 1,
                                borderColor: '#D61C4E',
                                width: 'auto',
                                height: 'auto',
                                paddingHorizontal: 20,
                            }}
                        >
                            <View>
                                <Text style={mtrTheme.screenTitle}>
                                    GROUP DETAILS
                                </Text>
                            </View>
                            <View style={mtrTheme.groupCardTopRow}>
                                <View>
                                    <Text
                                        style={mtrTheme.groupCardDetailsLabel}
                                    >
                                        Title:
                                    </Text>
                                </View>
                                <View>
                                    <Text style={mtrTheme.groupCardDetailsData}>
                                        {group.gender === 'f' && (
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsData
                                                }
                                            >
                                                Women's {group.title}
                                            </Text>
                                        )}
                                        {group.gender === 'm' && (
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsData
                                                }
                                            >
                                                Men's {group.title}
                                            </Text>
                                        )}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: 0,
                                    }}
                                >
                                    <Badge
                                        size={40}
                                        style={
                                            mtrTheme.groupDetailsAttendanceBadge
                                        }
                                    >
                                        {group.attendance}
                                    </Badge>
                                </View>
                            </View>
                            <View style={mtrTheme.groupCardRow}>
                                <View>
                                    <Text
                                        style={mtrTheme.groupCardDetailsLabel}
                                    >
                                        Location:
                                    </Text>
                                </View>
                                <View>
                                    <Text style={mtrTheme.groupCardDetailsData}>
                                        {group.location}
                                    </Text>
                                </View>
                            </View>
                            <View style={mtrTheme.groupCardRow}>
                                <View>
                                    <Text
                                        style={mtrTheme.groupCardDetailsLabel}
                                    >
                                        Faciliator:
                                    </Text>
                                </View>
                                <View>
                                    <Text style={mtrTheme.groupCardDetailsData}>
                                        {group.facilitator}
                                    </Text>
                                </View>
                            </View>
                            <View style={mtrTheme.groupCardRow}>
                                <View>
                                    <Text
                                        style={mtrTheme.groupCardDetailsLabel}
                                    >
                                        Co-faciliator:
                                    </Text>
                                </View>
                                <View>
                                    <Text style={mtrTheme.groupCardDetailsData}>
                                        {group.cofacilitator}
                                    </Text>
                                </View>
                            </View>
                            <View style={mtrTheme.groupCardRow}>
                                <View>
                                    <Text
                                        style={mtrTheme.groupCardDetailsLabel}
                                    >
                                        Notes:
                                    </Text>
                                </View>
                            </View>
                            <View style={mtrTheme.groupCardRow}>
                                <View>
                                    <Text
                                        style={mtrTheme.groupDetailsNotesText}
                                    >
                                        {group.notes}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Surface>
        </>
    );
};
export default withTheme(GroupDetailsScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
        alignItems: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },

    dateWrapper: {
        margin: 5,
    },
});
