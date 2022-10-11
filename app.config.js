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
                projectId: 'b1273427-4c94-4788-aab9-8500b07127d3',
            },
            meeter: '1.0.0-1',
        },

        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'guru.fortson.meeter',
            infoPlist: {
                // UIBackgroundModes: ['location', 'fetch'],
            },
            config: {},
        },
        android: {
            package: 'guru.fortson.meeter',
            versionCode: 1,

            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            config: {},
        },
        web: {
            favicon: './assets/favicon.png',
        },
        description: '1.0.0-1',
    };
};
