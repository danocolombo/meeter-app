export default ({ config }) => {
    // console.log(config);
    return {
        ...config,

        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },

        extra: {
            eas: {
                // projectId: '6e0dd50c-2b68-4f82-9ea3-8a76df387b43',
            },
            meeter: '1.0.0-1',
        },

        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'guru.fortson.eor',
            infoPlist: {
                // UIBackgroundModes: ['location', 'fetch'],
            },
            config: {
                googleMapsApiKey: 'AIzaSyAFWegK19_bMbbYuTeKatromwzuiC4lADo',
                MEETER_API:
                    'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev',
            },
        },
        android: {
            package: 'guru.fortson.meeter',
            versionCode: 1,

            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            config: {
                MEETER_API:
                    'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev',
            },
        },
        web: {
            favicon: './assets/favicon.png',
        },
        description: '1.0.0-1',
    };
};
