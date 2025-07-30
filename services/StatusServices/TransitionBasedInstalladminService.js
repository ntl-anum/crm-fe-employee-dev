/**
 * @author: Sheheryar Ahmed
 * @description: This file handles API calls for status mapping creation
 * @datetime : 16-SPE-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const transitionBasedInstalladminService = {
  createTransitionBasedInstallAdmin,
  listTransitionBasedInstallAdmin,
  enableTransitionBaseInstallationAdmin,
  disableTransitionBaseInstallationAdmin,
  deleteTransitionBaseInstallationAdmin,
  getOneTransitionBasedInstallAdmin,
  updateTransitionBasedInstallationAdmindata,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 * @author: Sheheryar Ahmed
 * @param {*} status_payload
 * @returns success or falilure response
 */
function createTransitionBasedInstallAdmin(params) {
  return fetchWrapper.post(
    `${baseUrl}customer-status/transitionBasedInstallAdmin`,
    params
  );
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} -
 * @returns success or falilure response
 */
function listTransitionBasedInstallAdmin() {
  return fetchWrapper.get(
    `${baseUrl}customer-status/transitionBasedInstallAdmin`
  );
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} statusId,operator
 * @returns success or falilure response
 */
function enableTransitionBaseInstallationAdmin(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/enableTransitionBasedInstallAdmin/${id}`,
    params
  );
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} statusId,operator
 * @returns success or falilure response
 */
function disableTransitionBaseInstallationAdmin(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/disableTransitionBasedInstallAdmin/${id}`,
    params
  );
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid
 * @returns success or falilure response
 */
function deleteTransitionBaseInstallationAdmin(id, operator) {
  return fetchWrapper.delete(
    `${baseUrl}customer-status/transitionBasedInstallAdmin/${id}`,
    operator
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneTransitionBasedInstallAdmin(id) {
  return fetchWrapper.get(
    `${baseUrl}customer-status/transitionBasedInstallAdmin/${id}`
  );
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} statusId,payload
 * @returns success or falilure response
 */
function updateTransitionBasedInstallationAdmindata(id, params) {
  return fetchWrapper.put(
    `${baseUrl}customer-status/updateTransitionBasedInstallAdmin/${id}`,
    params
  );
}
