/**
 * @author: Sehrish Naseer
 * @description: BackendAPIs handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const BackendAPIsService = {
  createBackendAPIs,
  updateBackendAPIs,
  deleteBackendAPIs,
  enableBackendAPIs,
  disableBackendAPIs,
  listBackendAPIs,
  listActiveBackendAPIs,
  listBackendAPIsDetails,
};

const authUrl=process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createBackendAPIs(params) {
  return fetchWrapper.post(`${authUrl}authorization/backendAPIs`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listBackendAPIs(params) {
  return fetchWrapper.get(`${authUrl}authorization/backendAPIs`, params);
}

function listActiveBackendAPIs(params) {
  return fetchWrapper.get(`${authUrl}authorization/backendAPIs-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listBackendAPIsDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/backendAPIsDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateBackendAPIs(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/backendAPIs/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteBackendAPIs(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/backendAPIs/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableBackendAPIs(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/backendAPIs/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableBackendAPIs(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/backendAPIs/disable/${id}`,
    body
  );
}
