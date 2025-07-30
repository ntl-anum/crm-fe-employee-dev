/**
 * @author: Mursleen Amjad
 * @description: This file handles API calls to StatusTransitionRules in Statuses Api
 * @datetime : 19-09-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const transitionBasedTTEmailService = {
  create,
  update,
  deleteItem,
  enable,
  disable,
  getAll,
  getOne,
  getAllStatusMappings,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 * This function send request to Backend API, for creation of  new StatusTransitionRule
 * @param {*} params
 * @returns success or failure response
 */
function create(params) {
  return fetchWrapper.post(
    `${baseUrl}customer-status/transitionBasedTTEmails/`,
    params
  );
}

/**
 *This function send request to Backend API, to get all StatusTransitionRule
 * @returns success or failure response
 */
function getAll() {
  return fetchWrapper.get(`${baseUrl}customer-status/transitionBasedTTEmails`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOne(id) {
  return fetchWrapper.get(
    `${baseUrl}customer-status/transitionBasedTTEmails/` + id
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function update(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/transitionBasedTTEmails/` + id,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteItem(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}customer-status/transitionBasedTTEmails/` + id,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enable(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/transitionBasedTTEmails/enable/` + id,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disable(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/transitionBasedTTEmails/disable/` + id,
    params
  );
}

/**
 *
 * @returns success or failure response
 */
function getAllStatusMappings() {
  return fetchWrapper.get(
    `${baseUrl}customer-status/statusTransitionRule/getAllStatusMapping`
  );
}
