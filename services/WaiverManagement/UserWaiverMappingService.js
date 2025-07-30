/**
 * @author: Mahnoor Mustajab
 * @description: UserWaiverMapping handling API's management File
 * @datetime : 11-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const UserWaiverMappingService = {
  createUserWaiverMapping,
  updateUserWaiverMapping,
  deleteUserWaiverMapping,
  enableUserWaiverMapping,
  disableUserWaiverMapping,
  getAllUserWaiverMappings,
  getOneUserWaiverMappings,
  getAllWaivers,
  getAllWaiverAuthorities,
  listEmployeesId
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createUserWaiverMapping(params) {
  return fetchWrapper.post(`${baseUrl}waiver/createUserWaiverMapping`, params);
}

function listEmployeesId(body) {
  return fetchWrapper.get(`${baseUrl}waiver/listEmployeesId`,body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllUserWaiverMappings() {
  return fetchWrapper.get(`${baseUrl}waiver/listUserWaiverMapping`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneUserWaiverMappings(id) {
  return fetchWrapper.get(
    `${baseUrl}waiver/listUserWaiverMapping/${id}`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateUserWaiverMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}waiver/updateUserWaiverMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteUserWaiverMapping(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}waiver/deleteUserWaiverMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableUserWaiverMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}waiver/enableUserWaiverMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableUserWaiverMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}waiver/disableUserWaiverMapping/${id}`,
    body
  );
}

/**
 *
 * @returns success or failure response
 */
function getAllWaivers() {
  return fetchWrapper.get(`${baseUrl}waiver/listWaiverPool`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllWaiverAuthorities(id) {
  return fetchWrapper.get(
    `${baseUrl}waiver/OneWaiver/${id}`
  );
}
