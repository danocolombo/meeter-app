import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import Logo from '../../../assets/M-square.png';
import CustomInput from '../../components/ui/CustomInput';
import CustomButton from '../../components/ui/Auth/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
// import { ALL_EVENTS } from '../../../../data/getRegionalEvents';
import { updateCurrentUser } from '../../features/usersSlice';
// import { getProfile } from '../../providers/users';
import { getAffiliate } from '../../providers/system';
// import { loadRallies } from '../../features/ralliesSlice';
import { loadRegistrations } from '../../features/usersSlice';
import {
    updateAppName,
    setRegion,
    setEventRegion,
    updateAffiliate,
    updateAffiliateTitle,
    updateStateProv,
    updateAffiliationString,
    updateUserRole,
} from '../../features/systemSlice';
import { getProfile } from '../../providers/users';
import { loadActiveMeetings } from '../../features/meetingsSlice';
import { getActiveMeetings } from '../../providers/rallies';
import { getToday, printObject, dateNumToDateDash } from '../../utils/helpers';
import { REGION } from '../../constants/regions';
const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    console.log('Errors', errors);
    // need this to pass the username on to forgot password
    const user = watch('username');
    const onSignInPressed = async (data) => {
        const { username, password } = data;
        //console.log(username, password);
        let alertPayload = {};
        let setAlert = {};
        await Auth.signIn(username, password)
            .then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            console.log(user);
                        })
                        .catch((e) => {
                            const alertPayload = {
                                msg: 'Authentication failed. Please check your credentials',
                                alertType: 'danger',
                            };
                            setAlert(alertPayload);
                            console.log(' need to return');
                            // return;
                        });
                } else {
                    // console.log('the user is good...');
                }
            })
            .catch((e) => {
                switch (e.code) {
                    case 'UserNotFoundException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'PasswordResetRequiredException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'NotAuthorizedException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    default:
                        alertPayload = {
                            msg: 'Signin error: [' + e.message + ']',
                            alertType: 'danger',
                        };
                        break;
                }
            });
        // if we have error loaded, let's return
        if (alertPayload.msg) {
            Alert.alert(alertPayload.msg);
            alertPayload = {};
            setLoading(false);
            return;
        }
        let currentUserInfo = {};
        let currentSession = {};
        await Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
        });
        await Auth.currentSession().then((data) => {
            currentSession = data;
        });
        // printObject('currentUserInfo:', currentUserInfo);
        // printObject('currentSession:', currentSession);
        //   ----------------------------------------------
        //   build theUser object
        //   ----------------------------------------------
        let i = currentSession?.idToken?.payload?.sub;
        let u = currentSession?.idToken?.payload['cognito:username'];
        let e = currentSession?.idToken?.payload?.email;
        let j = currentSession?.idToken?.jwtToken;
        let g = currentSession?.idToken?.payload['cognito:groups'];
        let theUser = {};
        theUser.uid = i;
        theUser.username = u;
        theUser.email = e;
        theUser.jwtToken = j;
        theUser.groups = g;
        //   ----------------------------------------------
        //   get user profile from DDB
        //   ----------------------------------------------
        let fullUserInfo = {};
        await getProfile(theUser.uid).then((profileResponse) => {
            // console.log('profileResponse', profileResponse);
            switch (profileResponse.statusCode) {
                case 200:
                    // profile found
                    let profileInfo = profileResponse.userProfile;
                    fullUserInfo = { ...theUser, ...profileInfo };
                    fullUserInfo.profile = true;
                    break;
                case 404:
                    // no profile for uid
                    fullUserInfo = theUser;
                    fullUserInfo.profile = false;
                default:
                    // we should get the error code, message and error
                    console.log('StatusCode: ', profileResponse.statusCode);
                    console.log('Message: ', profileResponse.message);
                    console.log('Error:', profileResponse.error);
                    // Alert.alert('Error getting the profile information');
                    fullUserInfo = theUser;
                    break;
            }

            dispatch(updateCurrentUser(fullUserInfo));
            //   get system.region and system.eventRegion
        });
        //   ----------------------------------------------
        //   get affiliate info from DDB
        //   ----------------------------------------------
        if (!fullUserInfo?.affiliations) {
            let defaultAff = {
                options: [
                    {
                        value: 'MTR',
                        label: 'MTR Testing',
                        role: 'guest',
                    },
                ],
                active: {
                    value: 'MTR',
                    label: 'MTR Testing',
                    role: 'guest',
                },
            };
            fullUserInfo = { ...fullUserInfo, affiliations: defaultAff };
        }
        dispatch(updateCurrentUser(fullUserInfo));
        getAffiliate(fullUserInfo.affiliations.active.value)
            .then((response) => {
                if (response.statusCode === 200) {
                    dispatch(
                        updateAffiliationString(
                            fullUserInfo.affiliations.active.value
                        )
                    );
                    dispatch(updateAffiliate(response.body[0]));
                    dispatch(updateAppName(response.body[0].appName));
                    dispatch(
                        updateAffiliateTitle(
                            fullUserInfo?.affiliations?.active?.label
                        )
                    );
                    if (fullUserInfo?.affiliations?.active?.role) {
                        dispatch(
                            updateUserRole(
                                fullUserInfo?.affiliations?.active?.role
                            )
                        );
                    } else {
                        dispatch(updateUserRole('guest'));
                    }
                } else {
                    console.log('response.statusCode:', response.statusCode);
                }
            })
            .catch((err) => {
                console.log('OH SNAP\n', err);
            });
        let today = dateNumToDateDash(meeter.today);
        getActiveMeetings(fullUserInfo.affiliations.active.value, today)
            .then((results) => {
                dispatch(loadActiveMeetings(results));
            })
            .catch((error) => {
                console.log('WE GOT ERROR GETTING ACTIVE MEETINGS');
                printObject('error', error);
                return;
            });
        // dispatch(updateCurrentUser(fullUserInfo));

        return;
    };
    //   ################################################
    //   OLD
    //   ################################################
    const onSignInPressed1 = async (data) => {
        //   get/set system.region and system.eventRegion
        getAffiliate(fullUserInfo.affiliations.active.value)
            .then((response) => {
                if (response.statusCode === 200) {
                    dispatch(
                        updateAffiliationString(
                            fullUserInfo.affiliations.active.value
                        )
                    );
                    dispatch(updateAffiliate(response.body[0]));
                    dispatch(updateAppName(response.body[0].appName));
                    dispatch(
                        updateAffiliateTitle(
                            fullUserInfo?.affiliations?.active?.label
                        )
                    );
                    dispatch(
                        updateStateProv(fullUserInfo?.residence?.stateProv)
                    );
                    if (fullUserInfo?.affiliations?.active?.role) {
                        dispatch(
                            updateUserRole(
                                fullUserInfo?.affiliations?.active?.role
                            )
                        );
                    } else {
                        dispatch(updateUserRole('guest'));
                    }
                    dispatch(setRegion(response.body[0].regions[0]));
                    dispatch(setEventRegion(response.body[0].eventRegions[0]));
                } else {
                    console.log('response.statusCode:', response.statusCode);
                }
            })
            .catch((err) => {
                console.log('OH SNAP\n', err);
            });

        // let's load redux with rallies.

        //   ====================================
        //   START RALLY LOADING
        //   ====================================
        const tDay = getPateDate(getToday());
        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };
        let obj = {
            operation: 'getAllEvents',
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.AWS_API_ENDPOINT + '/events';
        //let dbRallies = await axios.post(api2use, body, config);

        axios
            .post(api2use, body, config)
            .then((response) => {
                // printObject('SIS:208-->response:', response);
                //   SAVE ALL RALLIES TO REDUX
                dispatch(loadRallies(response.data.body.Items));
            })
            .catch((err) => {
                console.log('MS-60: error:', err);
                navigation.navigate('ErrorMsg', {
                    id: 'MS-60',
                    message:
                        'Cannot connect to server. Please check internet connection and try again.',
                });
            });
        //   ================================================
        //    now get all the registrations for the user
        //   ================================================
        // printObject('MS:128--> entireRallyList', entireRallyList);
        obj = {
            operation: 'getAllUserRegistrations',
            payload: {
                rid: theUser.uid,
            },
        };
        body = JSON.stringify(obj);

        api2use = process.env.AWS_API_ENDPOINT + '/registrations';
        //let dbRallies = await axios.post(api2use, body, config);
        try {
            axios
                .post(api2use, body, config)
                .then((regResponse) => {
                    //printObject('SIS:258-->response', response.data);
                    let respData = regResponse.data.body;
                    if (respData) {
                        function asc_sort(a, b) {
                            return b.eventDate - a.eventDate;
                        }
                        let newRegList = respData.sort(asc_sort);
                        // printObject('SIS:256-->regList', newRegList);
                        //todo ------------------------------------
                        //todo now get the events
                        //todo ------------------------------------
                        obj = {
                            operation: 'getAllEvents',
                        };
                        body = JSON.stringify(obj);
                        api2use = process.env.AWS_API_ENDPOINT + '/events';
                        try {
                            axios
                                .post(api2use, body, config)
                                .then((eResponse) => {
                                    let eventData = eResponse.data.body.Items;
                                    //   ------------------------------------------
                                    //   now match up the event with registrations
                                    //   ------------------------------------------
                                    const bigList = newRegList.map((reg) => {
                                        const eFound = eventData.filter(
                                            (e) => e.uid === reg.eid
                                        );
                                        const newReg = {
                                            ...reg,
                                            eventInfo: eFound[0],
                                        };
                                        return newReg;
                                    });
                                    dispatch(loadRegistrations(bigList));
                                })
                                .catch((err) => {
                                    console.log('SIS:255: error:', err);
                                    navigation.navigate('ErrorMsg', {
                                        id: 'SIS-376',
                                        message: 'Cannot blend events',
                                    });
                                });
                        } catch (error) {
                            console.log('SIS:381: error:', err);
                            navigation.navigate('ErrorMsg', {
                                id: 'SIS-383',
                                message:
                                    'Cannot connect to get registrations. Please check internet connection and try again.',
                            });
                        }
                        // dispatch(loadRegistrations(newRegList));
                    }
                })
                .catch((err) => {
                    console.log('SIS:392: error:', err);
                    navigation.navigate('ErrorMsg', {
                        id: 'SIS-394',
                        message:
                            'Cannot connect to server. Please check internet connection and try again.',
                    });
                });
        } catch (error) {
            console.log('SIS:400-->Axios errror.');
        }

        setLoading(false);
        return;
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                {/* <Image
                    source={Logo}
                    // styles={[styles.logo, { height: height * 0.1 }]}
                    // resizeMode='stretch'
                /> */}
                {/* <Image style={styles.tinyLogo} source={Logo} /> */}
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Image style={styles.logo} source={Logo} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 40,
                            color: 'black',
                        }}
                    >
                        MEETER
                    </Text>
                </View>
                <CustomInput
                    name='username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 4,
                            message: 'Username minimum length is 4',
                        },
                    }}
                    placeholder='Username'
                    control={control}
                />
                <CustomInput
                    name='password'
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password length too short',
                        },
                    }}
                    placeholder='Password'
                    control={control}
                    secureTextEntry
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text='Forgot Password'
                    onPress={forgotPasswordPressed}
                    type='TERTIARY'
                />
                {/* <SocialSignInButtons /> */}
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    root: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        // width: '100%',
        marginHorizontal: 20,
    },
    logo: {
        width: 240,
        height: 124,
    },
    tinyLogo: {
        width: 225,
        height: 225,
    },
});
