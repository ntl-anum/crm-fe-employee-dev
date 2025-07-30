/**
 * @author: Mahnoor Mustajab
 * @description: ActivationType handling API's management File
 * @datetime : 18-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ActivationTypeService = {
  createActivationType,
  updateActivationType,
  deleteActivationType,
  enableActivationType,
  disableActivationType,
  getAllActivationTypes,
  getActivationTypeByCustomerType,
  getAllAvailableActivationTypes,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createActivationType(params) {
  return fetchWrapper.post(`${baseUrl}customerConfig/activationType`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllActivationTypes(params) {
  return fetchWrapper.get(`${baseUrl}customerConfig/activationType`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllAvailableActivationTypes() {
  return fetchWrapper.get(`${baseUrl}customerConfig/availableActivationTypes`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getActivationTypeByCustomerType(type) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/activationTypeByCustomerType/${type}`
  );
}

/**
 *
 * @param {*} id
 * @returns success or failure response
 */
function updateActivationType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/activationType/${id}`,
    body
  );
}

/**
 *
 * @param {*} id
 * @returns success or failure response
 */
function deleteActivationType(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/activationType/${id}`,
    body
  );
}

/**
 *
 * @param {*} id
 * @returns success or failure response
 */
function enableActivationType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/activationType/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} id
 * @returns success or failure response
 */
function disableActivationType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/activationType/disable/${id}`,
    body
  );
}
/**
 *
 * @param {*} id
 * @returns success or failure response
 */

