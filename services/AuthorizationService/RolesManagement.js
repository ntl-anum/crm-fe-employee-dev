/**
 * @author: Sehrish Naseer
 * @description: Roles handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const RolesService = {
  createRoles,
  updateRoles,
  deleteRoles,
  enableRoles,
  disableRoles,
  listRoles,
  listActiveRoles,
  listRolesDetails,
};

const authUrl=process.env.AUTH_SERVICE_URL;
/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createRoles(params) {
  return fetchWrapper.post(`${authUrl}authorization/roles`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listRoles(params) {
  return fetchWrapper.get(`${authUrl}authorization/roles`, params);
}

function listActiveRoles(params) {
  return fetchWrapper.get(`${authUrl}authorization/roles-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listRolesDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/rolesDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateRoles(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/roles/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteRoles(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/roles/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableRoles(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/roles/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableRoles(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/roles/disable/${id}`, body);
}
