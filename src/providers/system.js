import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export async function getActivePublicAffiliates() {
    let obj = {
        operation: 'getActivePublic',
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/affiliations';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data;
    return returnValue;
}
export async function getAffiliate(affiliate) {
    let obj = {
        operation: 'getAffiliate',
        payload: {
            code: affiliate,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/affiliations';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data;
    return returnValue;
}
