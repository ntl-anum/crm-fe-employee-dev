/**
 * @author: Sheheryar Ahmed
 * @description: This file handles API calls for status mapping creation
 * @datetime : 16-SPE-2022
 */

import { fetchWrapper } from '../../helpers/fetch_wrapper';

export const StatusMappingService =
{
    createstatus,
    liststatusdata,
    enableStatus,
    disableStatus,
    deleteStatus,
    getOneStatus,
    updateStatus,
    // allActiveStatusList 

};

const baseUrl = process.env.CONFIG_SERVICES_URL;
const billingUrl = process.env.BILLING_SERVICE_URL;

/**
 * @author: Sheheryar Ahmed
 * @param {*} status_payload 
 * @returns success or falilure response
 */
function createstatus(params) {
    return fetchWrapper.post(`${baseUrl}customer-status/statusmapping`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} - 
 * @returns success or falilure responses
 */
function liststatusdata() {
    return fetchWrapper.get(`${baseUrl}customer-status/liststatusmapping`);
}
// function allActiveStatusList() {
//     return fetchWrapper.get(`${baseUrl}customer-status/allActiveStatusList`);
// }


/**
* @author: Sheheryar Ahmed
* @param {*} statusId,operator 
* @returns success or falilure response
*/
function enableStatus(id, params) {
    return fetchWrapper.put(`${baseUrl}customer-status/enablestatusmapping/${id}`, params);
}

/**
* @author: Sheheryar Ahmed
* @param {*} statusId,operator 
* @returns success or falilure response
*/
function disableStatus(id, params) {
    return fetchWrapper.put(`${baseUrl}customer-status/disablestatusmapping/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid 
 * @returns success or falilure response
 */
function deleteStatus(id, operator) {
    return fetchWrapper.delete(`${baseUrl}customer-status/statusmapping/${id}`, operator);
}


/**
* @author: Sheheryar Ahmed
* @param {*} statusId 
* @returns success or falilure response
*/
function getOneStatus(params) {
    return fetchWrapper.get(`${baseUrl}customer-status/statusmapping/${params}`);
}





/**
* @author: Sheheryar Ahmed
* @param {*} statusId,payload 
* @returns success or falilure response
*/
function updateStatus(id, params) {
    return fetchWrapper.put(`${baseUrl}customer-status/updatestatusmapping/${id}`, params);
}


