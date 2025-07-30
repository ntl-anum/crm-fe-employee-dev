/**
 * @author: Sehrish Naseer
 * @description: Company Country Mapping handling API's management File
 * @datetime : 30-DEC-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CompanyCountryMappingManagement = {
  createCompanyCountryMapping,
  updateCompanyCountryMapping,
  deleteCompanyCountryMapping,
  enableCompanyCountryMapping,
  disableCompanyCountryMapping,
  listCompanyCountryMapping,
  listCompanyCountryMappingDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createCompanyCountryMapping(params) {
  return fetchWrapper.post(`${baseUrl}locations/companyCountryMapping`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listCompanyCountryMapping(params) {
  return fetchWrapper.get(`${baseUrl}locations/companyCountryMappings`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listCompanyCountryMappingDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}locations/companyCountryMappingDetail`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCompanyCountryMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}locations/companyCountryMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCompanyCountryMapping(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}locations/companyCountryMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCompanyCountryMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}locations/companyCountryMapping/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCompanyCountryMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}locations/companyCountryMapping/disable/${id}`,
    body
  );
}
