/**
 * @author: Sehrish Naseer
 * @description: CustomerCategory handling API's management File
 * @datetime : 14-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerCategoryService = {
  createCustomerCategory,
  updateCustomerCategory,
  deleteCustomerCategory,
  enableCustomerCategory,
  disableCustomerCategory,
  getAllCustomerCategories,
  getAllActiveCustomerCategories
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerCategory(params) {
  return fetchWrapper.post(`${baseUrl}customerConfig/customerCategory`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategories(params) {
  return fetchWrapper.get(`${baseUrl}customerConfig/customerCategory`, params);
}

function getAllActiveCustomerCategories(params) {
  return fetchWrapper.get(`${baseUrl}customerConfig/activeCustomerCategory`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerCategory(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerCategory/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerCategory(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/customerCategory/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerCategory(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerCategory/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerCategory(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerCategory/disable/${id}`,
    body
  );
}
