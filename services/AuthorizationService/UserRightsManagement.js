/**
 * @author: Sehrish Naseer
 * @description: UserRights handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const UserRightsService = {
  createUserRights,
  updateUserRights,
  deleteUserRights,
  enableUserRights,
  disableUserRights,
  listUserRights,
  listUserRightsDetails,
  getAuthorizedAppModule,
  getAuthorizedSubmodule,
  getAuthorizedRoles,
  createBulkUserRights,
  getOldCrmRights,
};

const authUrl = process.env.AUTH_SERVICE_URL;
/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createUserRights(params) {
  return fetchWrapper.post(`${authUrl}authorization/userRights`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listUserRights(params) {
  return fetchWrapper.get(`${authUrl}authorization/userRights`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listUserRightsDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/userRightsDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateUserRights(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/userRights/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteUserRights(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/userRights/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableUserRights(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/userRights/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableUserRights(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/userRights/disable/${id}`,
    body
  );
}

function getAuthorizedAppModule(body) {
  return fetchWrapper.post(
    `${authUrl}authorization/userRights/authorizedAppModule`,
    body
  );
}
function getAuthorizedSubmodule(body) {
  return fetchWrapper.post(
    `${authUrl}authorization/userRights/authorizedSubmodule`,
    body
  );
}

function getAuthorizedRoles(body) {
  return fetchWrapper.post(
    `${authUrl}authorization/userRights/authorizedRoles`,
    body
  );
}

function createBulkUserRights(params) {
  return fetchWrapper.post(
    `${authUrl}authorization/createBulkUserRights`,
    params
  );
}
function getOldCrmRights(params) {
  return fetchWrapper.post(`${authUrl}authorization/getOldCrmRights`, params);
}
