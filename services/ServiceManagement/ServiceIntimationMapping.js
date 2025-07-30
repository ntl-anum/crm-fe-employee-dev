/**
 * @author: Sehrish Naseer
 * @description: ServiceIntimationMapping handling API's management File
 * @datetime : 26-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ServiceIntimationMappingService = {
  createServiceIntimationMapping,
  updateServiceIntimationMapping,
  deleteServiceIntimationMapping,
  enableServiceIntimationMapping,
  disableServiceIntimationMapping,
  getAllServiceIntimationMappings,
  getAllServiceIntimationMappingDetails,
  getAllServiceIntimationMappingEmailDetails,
  getAllServiceIntimationMappingSMSDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createServiceIntimationMapping(params) {
  return fetchWrapper.post(
    `${baseUrl}services/serviceIntimationMapping`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllServiceIntimationMappings(params) {
  return fetchWrapper.get(
    `${baseUrl}services/serviceIntimationMapping`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllServiceIntimationMappingDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}services/serviceIntimationMappingDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllServiceIntimationMappingEmailDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}services/serviceIntimationMappingEmailDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllServiceIntimationMappingSMSDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}services/serviceIntimationMappingSMSDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateServiceIntimationMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/serviceIntimationMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteServiceIntimationMapping(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}services/serviceIntimationMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableServiceIntimationMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/serviceIntimationMapping/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableServiceIntimationMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/serviceIntimationMapping/disable/${id}`,
    body
  );
}
