import { DefaultTheme } from 'react-native-paper';
const primaryBackground = '#000';
const primaryColor = '#A7D2CB';
const accentColor = '#F2D388';
const alternateColor = '#fff';
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
        surface: '#002',
        text: '#eee',
        //color for the disabled elements
        disabled: '#dfdfdf',
        //color for placeholder text, such as input placeholder
        placeholder: 'lightgrey',
        // color for backdrops of various components such as modals
        backdrop: '#eee',
        //background color for snackbars
        onSurface: 'yellow',
        // background color for badges
        notification: 'red',
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
    },
    subTitle: {
        fontSize: 24,
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
};
export default theme;
