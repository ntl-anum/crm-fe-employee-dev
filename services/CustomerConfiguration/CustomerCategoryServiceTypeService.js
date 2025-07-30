/**
 * @author: Sehrish Naseer
 * @description: CustomerCategoryServiceType handling API's management File
 * @datetime : 14-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerCategoryServiceTypeService = {
  createCustomerCategoryServiceType,
  updateCustomerCategoryServiceType,
  deleteCustomerCategoryServiceType,
  enableCustomerCategoryServiceType,
  disableCustomerCategoryServiceType,
  getAllCustomerCategoryServiceTypes,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerCategoryServiceType(params) {
  return fetchWrapper.post(
    `${baseUrl}customerConfig/customerCategoryServiceType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategoryServiceTypes(params) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/customerCategoryServiceType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerCategoryServiceType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerCategoryServiceType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerCategoryServiceType(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/customerCategoryServiceType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerCategoryServiceType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerCategoryServiceType/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerCategoryServiceType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/customerCategoryServiceType/disable/${id}`,
    body
  );
}
