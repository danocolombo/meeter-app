import axios from 'axios';
import { updateAffiliateActiveAndReference } from '../features/usersSlice';
import { printObject } from '../utils/helpers';
import { getAffiliate } from './system';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export async function getActiveMeetings(affiliate, today) {
    console.log('affiliate', affiliate);
    console.log('today', today);
    let obj = {
        operation: 'getActiveMeetings',
        payload: {
            clientId: affiliate.toLowerCase(),
            testDate: today,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data;
    return returnValue;
}
