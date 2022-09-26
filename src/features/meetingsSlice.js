import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject, getToday, getPateDate } from '../utils/helpers';
//   this is url for all meetings

const initialState = {
    meetings: [],
    tmpMeeting: {},
    isLoading: false,
};
export const getAvailableMeetings = createAsyncThunk(
    'meetings/getAvailableMeetings',
    async ({ name, today }, thunkAPI) => {
        try {
            const getFilterDate = async () => {
                return today;
            };

            return getFilterDate()
                .then((d) => d)
                .catch((e) => console.error('oops'));

            // const resp = await axios(url);
            // return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('MS:36-->>> something went wrong');
        }
    }
);
export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        createTmp: (state, action) => {
            state.tmpMeeting = {};
            state.tmpMeeting = action.payload;
            return state;
        },
        updateTmp: (state, action) => {
            let newTmp = Object.assign(state.tmpMeeting, action.payload);
            state.tmpMeeting = newTmp;
            return state;
        },

        loadMeetings: (state, action) => {
            state.meetings = action.payload;
            return state;
        },
        getMeeting: (state, action) => {
            let found = state.meetings.filter((m) => m.mid === action.payload);
            return found;
        },

        updateMeeting: (state, action) => {
            const newValue = action.payload;
            // console.log('newValue:', newValue);
            const newMeetingList = state.meetings.map((m) => {
                // console.log('typeof ral:', typeof ral);
                // console.log('typeof action.payload', typeof action.payload);
                return m.uid === newValue.mid ? newValue : m;
            });
            // console.log('=========FEATURE START==============');
            // console.log('f.r.RS:82-->newRallyList', newRallyList);
            // console.log('=========FEATURE END==============');
            function asc_sort(a, b) {
                return a.meetingDate - b.meetingDate;
            }
            let newBigger = newMeetingList.sort(asc_sort);
            state.meetings = newBigger;

            return state;
        },
        addNewMeeting: (state, action) => {
            let meetings = state.meetings;
            meetings.push(action.payload);
            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = meetings.sort(asc_sort);
            state.meetings = newBigger;
            // return
            return state;
        },
        deleteMeeting: (state, action) => {
            const smaller = state.meetings.filter(
                (m) => m.mid !== action.payload.mid
            );
            state.meetings = smaller;
            return state;
        },
        getMeetings: (state, action) => {
            return state.meetings;
        },

        logout: (state) => {
            state.meetings = [];
            state.tmpMeeting = {};
            return state;
        },
    },
    extraReducers: {
        [getAvailableMeetings.pending]: (state) => {
            state.isLoading = true;
        },
        [getAvailableMeetings.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoading = false;
            // printObject('RS:223--> action', action);
        },
        [getAvailableMeetings.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadMeetings,
    getMeetings,
    getMeeting,
    addNewMeeting,
    updateMeeting,
    deleteMeeting,
    createTmp,
    updateTmp,
    logout,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
