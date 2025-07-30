/**
 * @author: Mahnoor Mustajab
 * @description: CustomerCategoryPromotionType handling API's management File
 * @datetime : 15-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerCategoryPromotionTypeService = {
  createCustomerCategoryPromotionType,
  updateCustomerCategoryPromotionType,
  deleteCustomerCategoryPromotionType,
  enableCustomerCategoryPromotionType,
  disableCustomerCategoryPromotionType,
  getAllCustomerCategoryPromotionTypes,
  getOneCustomerCategoryPromotionTypes,
  getAllPromotions,
  getAllActivePromotions,
  getAllCustomerCategories,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerCategoryPromotionType(params) {
  return fetchWrapper.post(
    `${baseUrl}customerConfig/createCustomerCategoryPromotionType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategoryPromotionTypes(params) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listCustomerCategoryPromotionType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneCustomerCategoryPromotionTypes(id) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listCustomerCategoryPromotionType/${id}`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerCategoryPromotionType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/updateCustomerCategoryPromotionType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerCategoryPromotionType(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/deleteCustomerCategoryPromotionType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerCategoryPromotionType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/enableCustomerCategoryPromotionType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerCategoryPromotionType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/disableCustomerCategoryPromotionType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllPromotions() {
  return fetchWrapper.get(`${baseUrl}customerConfig/listAllPromotionPool`);
}
function getAllActivePromotions() {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listAllActivePromotionPool`
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategories() {
  return fetchWrapper.get(`${baseUrl}customerConfig/customerCategory`);
}
