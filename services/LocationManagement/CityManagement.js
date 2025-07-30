/**
 * @author: Mahnoor Mustajab
 * @description: City handling API's management File
 * @datetime : 12-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CityManagement = {
  createcity,
  updateCity,
  deleteCity,
  enableCity,
  disableCity,
  listcities,
  listcityDetails,
  listActiveCities,
  listOneCity,
  listActiveCityAreaSubareaMapping,
  listCitiesByState,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createcity(params) {
  return fetchWrapper.post(`${baseUrl}locations/city`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listcities(params) {
  return fetchWrapper.get(`${baseUrl}locations/city`, params);
}

function listActiveCities(params) {
  return fetchWrapper.get(`${baseUrl}locations/city-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneCity(id) {
  return fetchWrapper.get(`${baseUrl}locations/city/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listcityDetails(params) {
  return fetchWrapper.get(`${baseUrl}locations/cityDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateCity(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/city/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteCity(id, body) {
  return fetchWrapper.delete(`${baseUrl}locations/city/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableCity(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/city/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableCity(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/city/disable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listActiveCityAreaSubareaMapping(params) {
  return fetchWrapper.get(
    `${baseUrl}locations/city-area-subarea-active`,
    params
  );
}

/**
 * @param {*} -
 * @returns success or falilure response
 */
function listCitiesByState(id) {
  return fetchWrapper.get(`${baseUrl}locations/cityByState/${id}`);
}
