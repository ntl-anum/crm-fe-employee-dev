/**
 * @author: Sehrish Naseer
 * @description: Element handling API's management File
 * @datetime : 17-OCT-2023
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ElementService = {
  createElement,
  updateElement,
  deleteElement,
  enableElement,
  disableElement,
  listElements,
  listActiveElements,
  listElementDetails,
  listElementsBySubModuleId,
};

const authUrl = process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createElement(params) {
  return fetchWrapper.post(`${authUrl}authorization/element`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listElements(params) {
  return fetchWrapper.get(`${authUrl}authorization/element`, params);
}

function listActiveElements(params) {
  return fetchWrapper.get(`${authUrl}authorization/element-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateElement(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/element/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteElement(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/element/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableElement(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/element/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableElement(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/element/disable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listElementDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/elementDetails`, params);
}

function listElementsBySubModuleId(submoduleId) {
  return fetchWrapper.get(
    `${authUrl}authorization/elements/elementsBySubModuleId/${submoduleId}`
  );
}
