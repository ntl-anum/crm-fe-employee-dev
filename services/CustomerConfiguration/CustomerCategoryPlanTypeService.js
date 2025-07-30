/**
 * @author: Mahnoor Mustajab
 * @description: CustomerCategoryPlanType handling API's management File
 * @datetime : 15-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CustomerCategoryPlanTypeService = {
  createCustomerCategoryPlanType,
  updateCustomerCategoryPlanType,
  deleteCustomerCategoryPlanType,
  enableCustomerCategoryPlanType,
  disableCustomerCategoryPlanType,
  getAllCustomerCategoryPlanTypes,
  getOneCustomerCategoryPlanTypes,
  getAllPlans,
  getAllCustomerCategories,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCustomerCategoryPlanType(params) {
  return fetchWrapper.post(
    `${baseUrl}customerConfig/createCustomerCategoryPlanType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategoryPlanTypes(params) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listCustomerCategoryPlanType`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneCustomerCategoryPlanTypes(id) {
  return fetchWrapper.get(
    `${baseUrl}customerConfig/listCustomerCategoryPlanType/${id}`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCustomerCategoryPlanType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/updateCustomerCategoryPlanType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCustomerCategoryPlanType(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}customerConfig/deleteCustomerCategoryPlanType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCustomerCategoryPlanType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/enableCustomerCategoryPlanType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCustomerCategoryPlanType(id, body) {
  return fetchWrapper.put(
    `${baseUrl}customerConfig/disableCustomerCategoryPlanType/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllPlans() {
  return fetchWrapper.get(`${baseUrl}customerConfig/listAllPlanPool`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllCustomerCategories(params) {
  return fetchWrapper.get(`${baseUrl}customerConfig/customerCategory`, params);
}
