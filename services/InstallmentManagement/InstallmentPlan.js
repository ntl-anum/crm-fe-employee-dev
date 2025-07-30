/**
 * @author: Sehrish Naseer
 * @description: InstallmentPlan handling API's management File
 * @datetime : 01-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const InstallmentPlanService = {
  createInstallmentPlan,
  updateInstallmentPlan,
  deleteInstallmentPlan,
  enableInstallmentPlan,
  disableInstallmentPlan,
  getAllInstallmentPlans,
  getAllLocDependentInstallmentPlans,
  allActiveInstallmentPlans,
  getInstallmentPlansById,
  getAllInstallmentPlansForTable,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createInstallmentPlan(params) {
  return fetchWrapper.post(`${baseUrl}installment/installmentPlan`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllInstallmentPlansForTable() {
  return fetchWrapper.get(
    `${baseUrl}installment/getAllInstallmentPlansForTable`
  );
}
function getAllInstallmentPlans(params) {
  return fetchWrapper.get(`${baseUrl}installment/installmentPlan`, params);
}
function allActiveInstallmentPlans(params) {
  return fetchWrapper.get(
    `${baseUrl}installment/allActiveInstallmentPlans`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */ updateInstallmentPlan;
function getAllLocDependentInstallmentPlans(params) {
  return fetchWrapper.get(
    `${baseUrl}installment/installmentPlan/locationDependent`,
    params
  );
}

function getInstallmentPlansById(id) {
  return fetchWrapper.get(`${baseUrl}installment/installmentPlan/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateInstallmentPlan(id, body) {
  return fetchWrapper.put(`${baseUrl}installment/installmentPlan/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteInstallmentPlan(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}installment/installmentPlan/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableInstallmentPlan(id, body) {
  return fetchWrapper.put(
    `${baseUrl}installment/installmentPlan/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableInstallmentPlan(id, body) {
  return fetchWrapper.put(
    `${baseUrl}installment/installmentPlan/disable/${id}`,
    body
  );
}
