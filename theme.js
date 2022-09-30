import { DefaultTheme } from 'react-native-paper';
const primaryBackground = '#293462';
const primaryColor = '#1CD6CE';
const accentColor = '#FEDB39';
const alternateColor = '#D61C4E';
const historyTileColor = '#fff';
const darkColor = '#000';
const lightColor = '#fff';
const darkText = '#000';
const lightText = '#fff';
const theme = {
    ...DefaultTheme,
    // Specify custom property
    ourCustomPropertyKey: true,
    //whether this is dark theme or not
    dark: true,
    // color mode used for dark theme  ('adaptive' | 'exact')
    mode: 'exact',
    // roundness of common elements
    roundness: 50,
    // Specify custom property in nested object
    colors: {
        // primary color for your app, usually your brand color
        primary: primaryColor,
        // secondary color for your app which complements the primary color
        accent: accentColor,
        //background color for pages, such as lists
        background: primaryBackground,
        // background color for elements containing content, such as cards
        surface: primaryBackground,
        text: '#eee',
        //color for the disabled elements
        disabled: '#cccccc',
        //color for placeholder text, such as input placeholder
        placeholder: 'lightgrey',
        // color for backdrops of various components such as modals
        backdrop: '#eee',
        //background color for snackbars
        onSurface: 'yellow',
        // background color for badges
        notification: 'red',
        navActive: '#D61C4E',
        navInactive: '#8c8c8c',
        darkText: darkText,
        lightText: lightText,
    },
    fonts: {
        regular: 16,
        medium: 20,
        large: 24,
        largest: 30,
    },
    weight: {
        light: '300',
        medium: '500',
        heavy: '800',
    },
    animation: {
        scale: 30,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: primaryColor,
        textAlign: 'center',
        paddingTop: 20,
    },
    subTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: accentColor,
        textAlign: 'center',
    },
    subTitleSmall: {
        fontSize: 16,
        fontWeight: '500',
        color: accentColor,
        textAlign: 'center',
    },
    paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: primaryColor,
    },
    primaryButton: {
        fontWeight: '900',
    },
    //   MEETING CARD - ACTIVE
    meetingCardActivePrimary: {
        backgroundColor: primaryColor,
    },
    meetingCardActiveTypeText: {
        fontSize: 26,
        fontWeight: '600',
        paddingLeft: 0,
    },
    meetingCardActiveTitleText: {
        fontSize: 26,
        paddingLeft: 0,
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.5,
    },
    meetingCardActivePersonText: {
        fontSize: 24,
        paddingLeft: 0,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    meetingCardActiveDateBall: {
        backgroundColor: accentColor,
        textColor: darkText,
    },
    //   MEETING CARD - HISTORIC
    meetingCardHistoricPrimary: {
        backgroundColor: historyTileColor,
    },
    meetingCardHistoricTypeText: {
        fontSize: 26,
        fontWeight: '600',
        paddingLeft: 20,
    },
    meetingCardHistoricTitleText: {
        fontSize: 26,
        paddingLeft: 20,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    meetingCardHistoricPersonText: {
        fontSize: 24,
        paddingLeft: 20,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    meetingCardHistoricAttendanceBadge: {
        backgroundColor: primaryBackground,
    },
    //   MEETING CARD - COMMON
    meetingCardActiveAccent: {
        backgroundColor: accentColor,
    },
    meetingCardTypeText: {
        fontSize: 26,
        fontWeight: '600',
        paddingLeft: 20,
    },
    meetingCardTitleText: {
        fontSize: 26,
        paddingLeft: 20,
        fontWeight: '600',
        letterSpacing: 0.5,
        //borderWidth: 1,
        //borderColor: 'blue',
    },
    meetingCardPersonText: {
        fontSize: 24,
        paddingLeft: 20,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    //   MEETING DETAILS
    detailsTitle: {
        color: lightText,
        fontSize: 24,
        marginLeft: 10,
    },
    detailsRowLabel: {
        color: lightText,
        fontSize: 30,
        fontWeight: '600',
    },
    detailsRowValue: {
        color: lightText,
        fontSize: 28,
        padding: 10,
    },
    detailsBadge: {
        backgroundColor: lightColor,
        textColor: darkText,
    },
    //   DATE BALL/CHIP
    dateChipContainer: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: accentColor,
        alignItems: 'center',
        borderRadius: 20,
    },
    dateChipNonDayText: {
        color: darkText,
    },
    dateChipDayText: {
        color: darkText,
        fontSize: 28,
        fontWeight: '700',
    },
    //   SCREEN BACKGROUND
    screenSurface: {
        flex: 1,
        backgroundColor: primaryBackground,
    },
};
export default theme;
