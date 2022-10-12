import React, { useState, useEffect, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    Platform,
} from 'react-native';
import Navigation from './src/navigation/Navigation';
import { store } from './src/app/store';
import { Provider, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import awsconfig from './src/aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});
import { Amplify, Auth, Hub } from 'aws-amplify';
const queryClient = new QueryClient();
const mtrTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary5: '#1656A3',
        secondary: '#A8C7ED',
        accent: '#A8C7ED',
        lightBlack: '#696969',
        gray10: '#e6e6e6',
        gray20: '#cccccc',
        gray35: '#a6a6a6',
        gray50: '#808080',
        gray60: '#666666',
        gray75: '#404040',
    },
};

function App() {
    const [fontsLoaded] = useFonts({
        'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={theme}>
                    <SafeAreaView
                        style={
                            Platform === 'ios'
                                ? styles.containerIOS
                                : styles.container
                        }
                    >
                        <Navigation theme={theme} />
                    </SafeAreaView>
                </PaperProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
const styles = StyleSheet.create({
    containerIOS: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
