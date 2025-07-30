/**
 * @author: Sehrish Naseer
 * @description: Section handling API's management File
 * @datetime : 17-OCT-2023
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SectionService = {
  createSection,
  updateSection,
  deleteSection,
  enableSection,
  disableSection,
  listSections,
  listActiveSections,
  listSectionDetails,
  listSectionsBySubModuleId,
};

const authUrl = process.env.AUTH_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createSection(params) {
  return fetchWrapper.post(`${authUrl}authorization/section`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSections(params) {
  return fetchWrapper.get(`${authUrl}authorization/section`, params);
}

function listActiveSections(params) {
  return fetchWrapper.get(`${authUrl}authorization/section-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateSection(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/section/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteSection(id, body) {
  return fetchWrapper.delete(`${authUrl}authorization/section/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableSection(id, body) {
  return fetchWrapper.put(`${authUrl}authorization/section/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableSection(id, body) {
  return fetchWrapper.put(
    `${authUrl}authorization/section/disable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSectionDetails(params) {
  return fetchWrapper.get(`${authUrl}authorization/sectionDetails`, params);
}

function listSectionsBySubModuleId(submoduleId) {
  return fetchWrapper.get(
    `${authUrl}authorization/sections/sectionsBySubModuleId/${submoduleId}`
  );
}
