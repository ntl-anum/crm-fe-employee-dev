/**
 * @author: Mursleen Amjad
 * @description: This file handles API calls to StatusTransitionRules in Statuses Api
 * @datetime : 19-09-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const statusTransitionActionService = {
  create,
  update,
  deleteItem,
  enable,
  disable,
  getAllTransitionRules,
  getOne,
  enabelStatusTransitionRules,
  getOneAction,
  getAllStatusTransitionAction
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 * This function send request to Backend API, for creation of  new StatusTransitionRule
 * @param {*} params
 * @returns success or failure response
 */
function create(params) {
  return fetchWrapper.post(
    `${baseUrl}customer-status/statusTransitionActions/`,
    params
  );
}

/**
 *This function send request to Backend API, to get all StatusTransitionRule
 * @returns success or failure response
 */
function getAllTransitionRules() {
  // call to status transition rules api will be decided in future
  return fetchWrapper.get(`${baseUrl}customer-status/statusTransitionRules`);
}
function enabelStatusTransitionRules() {
  // call to status transition rules api will be decided in future
  return fetchWrapper.get(`${baseUrl}customer-status/enabelStatusTransitionRules`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOne(id) {
  return fetchWrapper.get(
    `${baseUrl}customer-status/statusTransitionActions/findOneByTransitionRuleId/${id}` 
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function update(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/statusTransitionActions/` + id,
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
    `${baseUrl}customer-status/statusTransitionActions/` + id,
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
    `${baseUrl}customer-status/statusTransitionActions/enable/` + id,
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
    `${baseUrl}customer-status/statusTransitionActions/disable/` + id,
    params
  );
}

/**
 *
 * @returns success or failure response
 */
function getOneAction(id) {
  return fetchWrapper.get(
    `${baseUrl}customer-status/statusTransitionActions/` + id
  );
}

function getAllStatusTransitionAction() {
  return fetchWrapper.get(
    `${baseUrl}customer-status/statusTransitionActions/findAllByTransitionRuleId`
  );
}
