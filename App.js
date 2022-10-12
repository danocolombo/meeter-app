import React, { useState, useEffect } from 'react';
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
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { FontAwesome, AnitIcon } from '@expo/vector-icons/FontAwesome';
import { Provider, useSelector } from 'react-redux';
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
function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
}

function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    // Load any resources or data that you need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // const imageAssets = cacheImages([
                //     'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                //     require('./assets/images/circle.jpg'),
                // ]);

                const fontAssets = cacheFonts([FontAwesome.font]);

                // await Promise.all([...imageAssets, ...fontAssets]);
                await Promise.all([...fontAssets]);
            } catch (e) {
                // You might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setAppIsReady(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!appIsReady) {
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
