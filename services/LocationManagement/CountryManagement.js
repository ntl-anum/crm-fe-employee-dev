/**
 * @author: Mahnoor Mustajab
 * @description: Country handling API's management File
 * @datetime : 12-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CountryManagement = {
  createcountry,
  updateCountry,
  deleteCountry,
  enableCountry,
  disableCountry,
  listcountry,
  listcountryDetails,
  listOneCountry,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createcountry(params) {
  return fetchWrapper.post(`${baseUrl}locations/country`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listcountry(params) {
  return fetchWrapper.get(`${baseUrl}locations/country-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneCountry(id) {
  return fetchWrapper.get(`${baseUrl}locations/country/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listcountryDetails(params) {
  return fetchWrapper.get(`${baseUrl}locations/countryDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCountry(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/country/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCountry(id, body) {
  return fetchWrapper.delete(`${baseUrl}locations/country/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCountry(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/country/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCountry(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/country/disable/${id}`, body);
}
