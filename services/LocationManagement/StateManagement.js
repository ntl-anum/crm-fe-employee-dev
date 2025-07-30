/**
 * @author: Mahnoor Mustajab
 * @description: State handling API's management File
 * @datetime : 12-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const StateManagement = {
  createstate,
  updateState,
  deleteState,
  enableState,
  disableState,
  // liststate,
  liststateDetails,
  listOneState,
  listActiveStates,
  listStatesByCountry,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createstate(params) {
  return fetchWrapper.post(`${baseUrl}locations/state`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
// function liststate(params) {
//   return fetchWrapper.get(`${baseUrl}locations/state`, params);
// }

function listActiveStates(params) {
  return fetchWrapper.get(`${baseUrl}locations/state-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneState(id) {
  return fetchWrapper.get(`${baseUrl}locations/state/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function liststateDetails(params) {
  return fetchWrapper.get(`${baseUrl}locations/stateDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateState(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/state/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteState(id, body) {
  return fetchWrapper.delete(`${baseUrl}locations/state/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableState(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/state/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableState(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/state/disable/${id}`, body);
}

/**
 * @param {*} -
 * @returns success or falilure response
 */
function listStatesByCountry(id) {
  return fetchWrapper.get(`${baseUrl}locations/stateByCountry/${id}`);
}
