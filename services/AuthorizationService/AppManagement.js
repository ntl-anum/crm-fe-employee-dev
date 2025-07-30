/**
 * @author: Sehrish Naseer
 * @description: App handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const AppService = {
  createApp,
  updateApp,
  deleteApp,
  enableApp,
  disableApp,
  listApps,
  listActiveApps
};

const authUrl=process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createApp(params) {
  return fetchWrapper.post(`${authUrl}authorization/app`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listApps(params) {
  return fetchWrapper.get(`${authUrl}authorization/app`, params);
}

function listActiveApps(params) {
  return fetchWrapper.get(`${authUrl}authorization/app-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateApp(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/app/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteApp(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/app/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableApp(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/app/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableApp(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/app/disable/${id}`, body);
}
