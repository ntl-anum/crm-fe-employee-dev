/**
 * @author: Masooma Rubab
 * @description: Dashboard-dashlet-Mapping API's management File
 * @datetime : 06-March-2023
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const DashletMappingService = {
  createDashletMapping,
  updateDashletMapping,
  deleteDashletMapping,
  enableDashletMapping,
  disableDashletMapping,
  listDashletMapping,
  listActiveDashletMapping,
  listDashletMappingAgainstUser,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createDashletMapping(params) {
  return fetchWrapper.post(`${baseUrl}dashboard/userDashletMapping`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listDashletMapping(params) {
  return fetchWrapper.get(`${baseUrl}dashboard/userDashletMapping`, params);
}

function listActiveDashletMapping(params) {
  return fetchWrapper.get(
    `${baseUrl}dashboard/userDashletMapping-active`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateDashletMapping(id, body) {
  return fetchWrapper.put(`${baseUrl}dashboard/userDashletMapping/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteDashletMapping(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}dashboard/userDashletMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableDashletMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}dashboard/userDashletMapping/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableDashletMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}dashboard/userDashletMapping/disable/${id}`,
    body
  );
}
function listDashletMappingAgainstUser(empId) {
  return fetchWrapper.get(
    `${baseUrl}dashboard/userDashletMapping/empDashlets/${empId}`
  );
}
