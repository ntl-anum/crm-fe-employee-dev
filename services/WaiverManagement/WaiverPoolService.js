/**
 * @author: Mahnoor Mustajab
 * @description: Waiver handling API's management File
 * @datetime : 10-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const WaiverPoolService = {
  createWaiver,
  updateWaiver,
  deleteWaiver,
  enableWaiver,
  disableWaiver,
  getAllWaivers,
  getAllWaiversByType,
  getAllActiveWaivers,
  listActiveWaiverAuthority,
  canUpdateWaiver,
  canUpdateWaiverAuthority,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createWaiver(params) {
  return fetchWrapper.post(`${baseUrl}waiver/createWaiverPool`, params);
}

/**
 *
 * @returns success or failure response
 */
function getAllWaivers() {
  return fetchWrapper.get(`${baseUrl}waiver/listWaiverPool`);
}

function getAllActiveWaivers() {
  return fetchWrapper.get(`${baseUrl}waiver/listActiveWaiverPool`);
}

function listActiveWaiverAuthority() {
  return fetchWrapper.get(`${baseUrl}waiver/listActiveWaiverAuthority`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateWaiver(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/updateWaiverPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteWaiver(id, body) {
  return fetchWrapper.delete(`${baseUrl}waiver/deleteWaiverPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableWaiver(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/enableWaiverPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableWaiver(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/disableWaiverPool/${id}`, body);
}

/**
 *
 * @returns success or failure response
 */
function getAllWaiversByType(type) {
  return fetchWrapper.get(`${baseUrl}waiver/getAllWaiversByType/${type}`);
}

function canUpdateWaiver(id) {
  return fetchWrapper.get(`${baseUrl}waiver/canUpdateWaiver/${id}`);
}
function canUpdateWaiverAuthority(id) {
  return fetchWrapper.get(`${baseUrl}waiver/canUpdateWaiverAuthority/${id}`);
}
