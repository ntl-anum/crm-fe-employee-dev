/**
 * @author: Sehrish Naseer
 * @description: Module handling API's management File
 * @datetime : 17-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ModuleService = {
  createModule,
  updateModule,
  deleteModule,
  enableModule,
  disableModule,
  listModule,
  listActiveModule,
  listModuleDetails,
  getModulesWithSectionRights,
  getModulesWithElementRights,
};

const authUrl = process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createModule(params) {
  return fetchWrapper.post(`${authUrl}authorization/module`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listModule(params) {
  return fetchWrapper.get(`${authUrl}authorization/module`, params);
}

function listActiveModule(params) {
  return fetchWrapper.get(`${authUrl}authorization/module-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listModuleDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/moduleDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateModule(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/module/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteModule(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/module/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableModule(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/module/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableModule(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/module/disable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getModulesWithSectionRights() {
  return fetchWrapper.get(`${authUrl}authorization/sectionRightsModules`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getModulesWithElementRights() {
  return fetchWrapper.get(`${authUrl}authorization/elementRightsModules`);
}
