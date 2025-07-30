/**
 * @author: Arslan Ali
 * @description: SMSActionDetailService handling API's management File
 * @datetime : 24-Jan-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SMSActionDetailService = {
  getAllSmsActionDetails,
  deleteSmsActionDetail,
  getServicesOfSmsAction,
  createSmsActionDetails,
  updateSmsActionDetails,
  disableSmsActionDetails,
  enableSmsActionDetails
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */

function getServicesOfSmsAction(params) {
  return fetchWrapper.get(
    `${baseUrl}post-actions/getServicesOfSmsAction`,
    params
  );
}

function deleteSmsActionDetail(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}post-actions/deleteSmsActionDetail/${id}`,
    body
  );
}

function getAllSmsActionDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}post-actions/getAllSmsActionDetails`,
    params
  );
}
function createSmsActionDetails(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}post-actions/createSmsActionDetails`,
    payLoad
  );
}
function updateSmsActionDetails(id, params) {
  return fetchWrapper.put(`${baseUrl}post-actions/updateSmsActionDetails/` + id, params);
}


function disableSmsActionDetails(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/disableSmsActionDetails/${id}`,
    params
  );
  }

  function enableSmsActionDetails(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/enableSmsActionDetails/${id}`,
    params
  );
  }

