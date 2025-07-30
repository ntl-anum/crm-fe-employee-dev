/**
 * @author: Sehrish Naseer
 * @description: CustomerConnectionType handling API's management File
 * @datetime : 14-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerConnectionTypeService = {
  createCustomerConnectionType,
  updateCustomerConnectionType,
  deleteCustomerConnectionType,
  enableCustomerConnectionType,
  disableCustomerConnectionType,
  getAllCustomerConnectionTypes,
  getActiveCustomerConnectionTypes,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerConnectionType(params) {
  return fetchWrapper.post(
    `${baseUrl}customerConfig/customerConnectionType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerConnectionTypes(params) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/customerConnectionType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getActiveCustomerConnectionTypes(params) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/getActiveCustomerConnectionType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerConnectionType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerConnectionType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerConnectionType(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/customerConnectionType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerConnectionType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerConnectionType/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerConnectionType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerConnectionType/disable/${id}`,
    body
  );
}
