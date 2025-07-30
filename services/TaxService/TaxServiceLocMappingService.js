/**
 * @author: Sehrish Naseer
 * @description: Tax Service Loc Mapping handling API's management File
 * @datetime : 22-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const TaxServiceLocMappingService = {
  createTaxServiceLocMapping,
  updateTaxServiceLocMapping,
  deleteTaxServiceLocMapping,
  enableTaxServiceLocMapping,
  disableTaxServiceLocMapping,
  listTaxServiceLocMappings,
  listTaxServiceLocMappingDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createTaxServiceLocMapping(params) {
  return fetchWrapper.post(`${baseUrl}taxes/taxServiceLocMapping`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listTaxServiceLocMappings(params) {
  return fetchWrapper.post(
    `${baseUrl}taxes/taxServiceSubareaMapping`, params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listTaxServiceLocMappingDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}taxes/taxServiceLocMappingDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateTaxServiceLocMapping(id, body) {
  return fetchWrapper.put(`${baseUrl}taxes/taxServiceLocMapping/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteTaxServiceLocMapping(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}taxes/taxServiceLocMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableTaxServiceLocMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}taxes/taxServiceLocMapping/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableTaxServiceLocMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}taxes/taxServiceLocMapping/disable/${id}`,
    body
  );
}
