/**
 * @author: Sehrish Naseer
 * @description: SubModule handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SubModuleService = {
  createSubModule,
  updateSubModule,
  deleteSubModule,
  enableSubModule,
  disableSubModule,
  listSubModule,
  listActiveSubModule,
  listSubModuleDetails,
  getSubModulesWithSectionRights,
  getSubModulesWithElementRights,
  getSubmodulesByModuleId,
  getSubmoduleAndModuleByElementId,
  getSubmoduleAndModuleBySectionId,
  checkRightsAtSubModuleOrParentExist,
};

const authUrl = process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createSubModule(params) {
  return fetchWrapper.post(`${authUrl}authorization/submodule`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSubModule(params) {
  return fetchWrapper.get(`${authUrl}authorization/submodule`, params);
}

function listActiveSubModule(params) {
  return fetchWrapper.get(`${authUrl}authorization/submodule-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSubModuleDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/submoduleDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateSubModule(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/submodule/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteSubModule(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/submodule/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableSubModule(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/submodule/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableSubModule(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/submodule/disable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getSubModulesWithSectionRights(params) {
  return fetchWrapper.get(
    `${authUrl}authorization/sectionRightsSubModules`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getSubModulesWithElementRights(params) {
  return fetchWrapper.get(
    `${authUrl}authorization/elementRightsSubModules`,
    params
  );
}
function getSubmodulesByModuleId(moduleId) {
  return fetchWrapper.get(
    `${authUrl}authorization/submodule/submodulesByModuleId/${moduleId}`
  );
}
function getSubmoduleAndModuleByElementId(elementId) {
  return fetchWrapper.get(
    `${authUrl}authorization/submodule/submoduleAndModuleByElementId/${elementId}`
  );
}
function getSubmoduleAndModuleBySectionId(sectionId) {
  return fetchWrapper.get(
    `${authUrl}authorization/submodule/submoduleAndModuleBySectionId/${sectionId}`
  );
}

function checkRightsAtSubModuleOrParentExist(body) {
  return fetchWrapper.post(
    `${authUrl}authorization/submodule/rightsAtSubModuleOrParent`,
    body
  );
}
