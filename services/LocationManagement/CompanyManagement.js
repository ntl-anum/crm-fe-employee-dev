/**
 * @author: Mahnoor Mustajab
 * @description: Company handling API's management File
 * @datetime : 12-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CompanyManagement = {
  createcompany,
  updateCompany,
  deleteCompany,
  enableCompany,
  disableCompany,
  listcompany,
  listActiveCompany,
  listOneCompany,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createcompany(params) {
  return fetchWrapper.post(`${baseUrl}locations/company`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listcompany(params) {
  return fetchWrapper.get(`${baseUrl}locations/company`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listActiveCompany(params) {
  return fetchWrapper.get(`${baseUrl}locations/company-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneCompany(id) {
  return fetchWrapper.get(`${baseUrl}locations/company/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCompany(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/company/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCompany(id, body) {
  return fetchWrapper.delete(`${baseUrl}locations/company/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCompany(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/company/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCompany(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/company/disable/${id}`, body);
}
