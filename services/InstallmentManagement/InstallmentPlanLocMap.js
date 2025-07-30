/**
 * @author: Sehrish Naseer
 * @description: InstallmentPlanLocMap handling API's management File
 * @datetime : 01-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const InstallmentPlanLocMapService = {
  createInstallmentPlanLocMap,
  updateInstallmentPlanLocMap,
  deleteInstallmentPlanLocMap,
  enableInstallmentPlanLocMap,
  disableInstallmentPlanLocMap,
  getAllInstallmentPlanLocMaps,
  listInstallmentLocationMappingDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createInstallmentPlanLocMap(params) {
  return fetchWrapper.post(
    `${baseUrl}installment/installmentPlanLocMap`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllInstallmentPlanLocMaps(params) {
  return fetchWrapper.get(
    `${baseUrl}installment/installmentPlanLocMap`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateInstallmentPlanLocMap(id, body) {
  return fetchWrapper.put(
    `${baseUrl}installment/installmentPlanLocMap/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteInstallmentPlanLocMap(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}installment/installmentPlanLocMap/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableInstallmentPlanLocMap(id, body) {
  return fetchWrapper.put(
    `${baseUrl}installment/installmentPlanLocMap/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableInstallmentPlanLocMap(id, body) {
  return fetchWrapper.put(
    `${baseUrl}installment/installmentPlanLocMap/disable/${id}`,
    body
  );

  
}
function listInstallmentLocationMappingDetails(params) {

  return fetchWrapper.post(
    `${baseUrl}installment/installmentPlanLocMap/installmentServiceSubareaMapping`,
    params
  );
}