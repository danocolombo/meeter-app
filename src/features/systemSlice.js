import { createSlice } from '@reduxjs/toolkit';
import { printObject } from '../utils/helpers';
const makeToday1 = () => {
    var d = new Date();
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1] < 10 ? '0' + dateparts[1] : dateparts[1];
    const target = yr + mn + da;
    return target; // returns YYYYMMDD
};
const makeToday = () => {
    var data = new Date();
    // printObject('data', data);
    const yr = parseInt(data.getFullYear());
    let mo = parseInt(data.getMonth());
    const da = parseInt(data.getDate());
    const hr = parseInt(data.getHours());
    const mi = parseInt(data.getMinutes());
    //month and day lengths if applicable
    mo = mo + 1;
    const moFix = ('0' + mo.toString()).slice(-2);
    const daFix = ('0' + da.toString()).slice(-2);
    const target = yr.toString() + moFix + daFix;
    return target; //
};
let today = makeToday();
let AFF = {
    ownerEmail: 'dflt@init.com',
    code: 'DFLT',
    ownerContact: 'Affiliate Owner',
    label: 'DEFAULT',
    status: 'active',
    category: 'default',
    description: 'default desc. value',
    ownerPhone: '1234567890',
    title: 'Welcome...',
};

const initialState = {
    appName: 'Meeter',
    region: 'us#east#dflt',
    eventRegion: 'test',
    stateProv: 'GA',
    affiliateTitle: 'MEETER',
    today: today,
    affiliation: 'DFLT',
    isLoading: true,
    affiliate: AFF,
    userRole: '',
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        updateAppName: (state, action) => {
            state.appName = action.payload;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        updateRegion: (state, action) => {
            state.region = action.payload;
        },
        setEventRegion: (state, action) => {
            state.eventRegion = action.payload;
        },
        updateEventRegion: (state, action) => {
            state.eventRegion = action.payload;
        },
        updateStateProv: (state, action) => {
            state.stateProv = action.payload;
        },
        updateAffiliate: (state, action) => {
            state.affiliate = action.payload;
        },
        updateAffiliationString: (state, action) => {
            state.affiliation = action.payload;
        },
        updateAffiliation: (state, action) => {
            state.appName = action.payload.appName;
            state.region = action.payload.regions[0];
            state.eventRegion = action.payload.eventRegions[0];
            state.affiliateTitle = action.payload.title;
            state.affiliation = action.payload.value;
            state.userRole = action.payload.userRole;
            delete action.payload.userRole;
            state.affiliate = action.payload;
            return state;
        },

        updateAffiliateTitle: (state, action) => {
            state.affiliateTitle = action.payload;
        },
        updateUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        clearToday: (state) => {
            state.today = '';
        },
        setSystemDate: (state, action) => {
            state.today = action.payload;
        },
        logout: (state) => {
            state.appName = '';
            state.region = '';
            state.eventRegion = '';
            state.stateProv = '';
            state.affiliateTitle = '';
            state.affiliationEntity = '';
            state.userRole = '';
            state.affiliation = '';
            state.affiliate = {};
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    updateAppName,
    setRegion,
    setEventRegion,
    updateEventRegion,
    updateRegion,
    logout,
    updateStateProv,
    setSystemDate,
    updateAffiliate,
    updateUserRole,
    updateAffiliationString,
    updateAffiliateTitle,
    updateAffiliation,
    clearToday,
} = systemSlice.actions;

export default systemSlice.reducer;
