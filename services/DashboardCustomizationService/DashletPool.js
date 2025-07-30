/**
 * @author: Masooma Rubab
 * @description: Dashboard-dashlet Pool API's management File
 * @datetime : 06-March-2023
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const DashletPoolService = {
  createDashletPool,
  updateDashletPool,
  deleteDashletPool,
  enableDashletPool,
  disableDashletPool,
  listDashletPool,
  listActiveDashletPool,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createDashletPool(params) {
  return fetchWrapper.post(`${baseUrl}dashboard/dashletPool`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listDashletPool(params) {
  return fetchWrapper.get(`${baseUrl}dashboard/dashletPool`, params);
}

function listActiveDashletPool(params) {
  return fetchWrapper.get(`${baseUrl}dashboard/dashletPool-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateDashletPool(id, body) {
  return fetchWrapper.put(`${baseUrl}dashboard/dashletPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteDashletPool(id, body) {
  return fetchWrapper.delete(`${baseUrl}dashboard/dashletPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableDashletPool(id, body) {
  return fetchWrapper.put(`${baseUrl}dashboard/dashletPool/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableDashletPool(id, body) {
  return fetchWrapper.put(
    `${baseUrl}dashboard/dashletPool/disable/${id}`,
    body
  );
}
