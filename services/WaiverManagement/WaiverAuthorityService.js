/**
 * @author: Mahnoor Mustajab
 * @description: WaiverAuthority handling API's management File
 * @datetime : 10-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const WaiverAuthorityService = {
  createWaiverAuthority,
  updateWaiverAuthority,
  deleteWaiverAuthority,
  enableWaiverAuthority,
  disableWaiverAuthority,
  getAllWaiverAuthorities,
  getOneWaiverAuthorities,
  getAllWaivers,
  getAllEmpIds,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createWaiverAuthority(params) {
  return fetchWrapper.post(`${baseUrl}waiver/createWaiverAuthority`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllWaiverAuthorities() {
  return fetchWrapper.get(`${baseUrl}waiver/listWaiverAuthorityDetail`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneWaiverAuthorities(id) {
  return fetchWrapper.get(`${baseUrl}waiver/listWaiverAuthority/${id}`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateWaiverAuthority(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/updateWaiverAuthority/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteWaiverAuthority(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}waiver/deleteWaiverAuthority/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableWaiverAuthority(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/enableWaiverAuthority/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableWaiverAuthority(id, body) {
  return fetchWrapper.put(
    `${baseUrl}waiver/disableWaiverAuthority/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllWaivers() {
  return fetchWrapper.get(`${baseUrl}waiver/listWaiverPool`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllEmpIds() {
  return fetchWrapper.get(`${baseUrl}waiver/listAllEmployees`);
}
