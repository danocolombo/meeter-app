import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
// import { Colors } from '../constants/colors';
import { Surface, withTheme } from 'react-native-paper';
import { printObject } from '../utils/helpers';

const LandingScreen = (props) => {
    const navigation = useNavigation();
    const {
        colors,
        fonts,
        weight,
        screenTitle,
        subTitle,
        paragraph,
        primaryButton,
    } = props.theme;
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);

    const meeter = useSelector((state) => state.system);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    return (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <>
                <Surface style={styles.welcomeSurface}>
                    <View style={styles.heroImageContainer}>
                        {/* <Image
                            source={require('../../assets/images/FEO.png')}
                            style={{ resizeMode: 'cover' }}
                        ></Image> */}
                    </View>

                    <View
                        style={{
                            marginTop: 15,
                            marginHorizontal: 40,
                            marginBottom: 20,
                            // backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 5,
                        }}
                    >
                        <Text style={screenTitle}>WELCOME</Text>
                        <Text style={subTitle}>Now What?</Text>
                    </View>
                </Surface>
            </>
        </ImageBackground>
    );
};
export default withTheme(LandingScreen);
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    heroImageContainer: {
        // flexDirection: 'column',
        marginTop: 10,

        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
    },
    mainTextContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    subTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 34,
        letterSpacing: 0.5,
        fontWeight: '600',
        // color: 'white',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        // color: 'white',
    },
    affiliateHeader: {
        paddingTop: 20,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        paddingBottom: 20,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoText: {
        // color: 'white',
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '65%',
    },
    modalContainer: {
        marginTop: '200',
        // alignSelf: 'flex-end',
    },
    welcomeSurface: {
        padding: 12,
        marginVertical: 8,
        // backgroundColor: Colors.primary500,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'grey',
        shadowRadius: 8,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
    },
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        // elevation: 3,
        shadowColor: 'grey',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    modalInfoWrapper: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
