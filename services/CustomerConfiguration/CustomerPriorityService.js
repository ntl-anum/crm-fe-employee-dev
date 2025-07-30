/**
 * @author: Sehrish Naseer
 * @description: CustomerPriority handling API's management File
 * @datetime : 14-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerPriorityService = {
  createCustomerPriority,
  updateCustomerPriority,
  deleteCustomerPriority,
  enableCustomerPriority,
  disableCustomerPriority,
  getAllCustomerPriorities,
  getAllActiveCustomerPriorities,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerPriority(params) {
  return fetchWrapper.post(`${baseUrl}customerConfig/customerPriority`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerPriorities(params) {
  return fetchWrapper.get(`${baseUrl}customerConfig/customerPriority`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllActiveCustomerPriorities(params) {
  return fetchWrapper.get(`${baseUrl}customerConfig/getAllActiveCustomerPriorities`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerPriority(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerPriority/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerPriority(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/customerPriority/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerPriority(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerPriority/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerPriority(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerPriority/disable/${id}`,
    body
  );
}
