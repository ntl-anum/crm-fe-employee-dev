/**
 * @author: Sehrish Naseer
 * @description: SubModuleAPIMapping handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SubModuleAPIMappingService = {
  createSubModuleAPIMapping,
  updateSubModuleAPIMapping,
  deleteSubModuleAPIMapping,
  enableSubModuleAPIMapping,
  disableSubModuleAPIMapping,
  listSubModuleAPIMapping,
  listSubModuleAPIMappingDetails,
};

const authUrl = process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createSubModuleAPIMapping(params) {
  return fetchWrapper.post(
    `${authUrl}authorization/submoduleAPIMapping`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSubModuleAPIMapping(params) {
  return fetchWrapper.get(
    `${authUrl}authorization/submoduleAPIMapping`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSubModuleAPIMappingDetails(params) {
  return fetchWrapper.get(
    `${authUrl}authorization/submoduleAPIMappingDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateSubModuleAPIMapping(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/submoduleAPIMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteSubModuleAPIMapping(id, body) {
  return fetchWrapper.delete(
    `${authUrl}authorization/submoduleAPIMapping/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableSubModuleAPIMapping(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/submoduleAPIMapping/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableSubModuleAPIMapping(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/submoduleAPIMapping/disable/${id}`,
    body
  );
}
