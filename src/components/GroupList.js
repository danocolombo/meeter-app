import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';

import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';

const GroupList = ({ meetingId }) => {
    const [isLoading, setIsLoadiing] = useState(true);
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeting = useSelector((state) =>
        state.meetings.meetings.filter((m) => m.meetingId === meetingId)
    );
    const groups = useSelector((state) => state.meetings.groups);

    useEffect(() => {
        //check for groups
        dispatch(clearGroups());
        const groups = dispatch(getMeetingGroups(meetingId));
        // setGroups(groups);
        setIsLoadiing(false);
    }, []);
    if (isLoading) {
        return <ActivityIndicator color={mtrTheme.colors.accent} size={40} />;
    }
    printObject('GL:29-->meeting', meeting);
    return (
        <>
            {groups.length > 0 && (
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item.groupId}
                    persistentScrollbar={true}
                    renderItem={({ item }) => (
                        <GroupListCard group={item} meeting={meeting} />
                    )}
                    ListFooterComponent={<></>}
                />
            )}
        </>
    );
};

export default GroupList;
