/**
 * @author: Sehrish Naseer
 * @description: Tax Pool handling API's management File
 * @datetime : 22-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const TaxPoolService = {
  createTaxPool,
  updateTaxPool,
  deleteTaxPool,
  enableTaxPool,
  disableTaxPool,
  listTaxPools,
  listOneTaxPool,
  listEnableTaxPools,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createTaxPool(params) {
  return fetchWrapper.post(`${baseUrl}taxes/taxPool`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listTaxPools(params) {
  return fetchWrapper.get(`${baseUrl}taxes/taxPool`, params);
}
function listEnableTaxPools(params) {
  return fetchWrapper.get(`${baseUrl}taxes/enableTaxPool`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneTaxPool(id) {
  return fetchWrapper.get(`${baseUrl}taxes/taxPool/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateTaxPool(id, body) {
  return fetchWrapper.put(`${baseUrl}taxes/taxPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteTaxPool(id, body) {
  return fetchWrapper.delete(`${baseUrl}taxes/taxPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableTaxPool(id, body) {
  return fetchWrapper.put(`${baseUrl}taxes/taxPool/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableTaxPool(id, body) {
  return fetchWrapper.put(`${baseUrl}taxes/taxPool/disable/${id}`, body);
}
