/**
 * @author: Mahnoor Mustajab
 * @description: Sub Area handling API's management File
 * @datetime : 12-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SubAreaManagement = {
  createsubarea,
  updateSubArea,
  deleteSubArea,
  enableSubArea,
  disableSubArea,
  listsubarea,
  listsubareaDetail,
  listEnabledsubareaDetail,
  listOneSubarea,
  getSubAreaByAreaId,
  listActiveSubArea,
  getInstallationTimeBySubarea,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createsubarea(params) {
  return fetchWrapper.post(`${baseUrl}locations/subarea`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listsubarea(params) {
  return fetchWrapper.get(`${baseUrl}locations/subarea`, params);
}

function listActiveSubArea(params) {
  return fetchWrapper.get(`${baseUrl}locations/subarea-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneSubarea(id) {
  return fetchWrapper.get(`${baseUrl}locations/subarea/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listsubareaDetail(params) {
  return fetchWrapper.get(`${baseUrl}locations/subareaDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listEnabledsubareaDetail(params) {
  return fetchWrapper.get(`${baseUrl}locations/EnabledSubareaDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateSubArea(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/subarea/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteSubArea(id, body) {
  return fetchWrapper.delete(`${baseUrl}locations/subarea/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableSubArea(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/subarea/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableSubArea(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/subarea/disable/${id}`, body);
}
function getSubAreaByAreaId(id) {
  return fetchWrapper.get(`${baseUrl}locations/subareaByArea/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getInstallationTimeBySubarea(id) {
  return fetchWrapper.get(`${baseUrl}locations/subarea/installationTime/${id}`);
}
