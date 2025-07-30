/**
 * @author: Mahnoor Mustajab
 * @description: CustomerCategoryBundleType handling API's management File
 * @datetime : 15-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerCategoryBundleTypeService = {
  createCustomerCategoryBundleType,
  updateCustomerCategoryBundleType,
  deleteCustomerCategoryBundleType,
  enableCustomerCategoryBundleType,
  disableCustomerCategoryBundleType,
  getAllCustomerCategoryBundleTypes,
  getOneCustomerCategoryBundleTypes,
  getAllBundles,
  getAllActiveBundles,
  getAllCustomerCategories,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerCategoryBundleType(params) {
  return fetchWrapper.post(
    `${baseUrl}customerConfig/createCustomerCategoryBundleType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategoryBundleTypes() {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listCustomerCategoryBundleType`
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneCustomerCategoryBundleTypes(id) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listCustomerCategoryBundleType/${id}`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerCategoryBundleType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/updateCustomerCategoryBundleType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerCategoryBundleType(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/deleteCustomerCategoryBundleType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerCategoryBundleType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/enableCustomerCategoryBundleType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerCategoryBundleType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/disableCustomerCategoryBundleType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllBundles() {
  return fetchWrapper.get(`${baseUrl}customerConfig/listAllBundlePool`);
}

function getAllActiveBundles() {
  return fetchWrapper.get(`${baseUrl}customerConfig/listAllActiveBundlePool`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategories() {
  return fetchWrapper.get(`${baseUrl}customerConfig/customerCategory`);
}
