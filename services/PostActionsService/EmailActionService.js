/**
 * @author: Arslan Ali
 * @description: EMAILActionDetailService handling API's management File
 * @datetime : 24-Jan-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const EMAILActionDetailService = {
  getAllEmailActionDetails,
  deleteEmailActionDetails,
  createEmailActionDetails,
  getServicesOfEmailAction,
  getAllServiceActionMapping,
  updateEmailActionDetails,
  disableEmailActionDetails,
  enableEmailActionDetails
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */

function deleteEmailActionDetails(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}post-actions/deleteEmailActionDetails/${id}`,
    body
  );
}

function getAllEmailActionDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}post-actions/getAllEmailActionDetails`,
    params
  );
}
function createEmailActionDetails(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}post-actions/createEmailActionDetails`,
    payLoad
  );
}

function getServicesOfEmailAction(params) {
  return fetchWrapper.get(
    `${baseUrl}post-actions/getServicesOfEmailAction`,
    params
  );
}

function getAllServiceActionMapping(params) {
  return fetchWrapper.get(
    `${baseUrl}post-actions/getAllServiceActionMapping`,
    params
  );
}


function updateEmailActionDetails(id, params) {
  return fetchWrapper.put(`${baseUrl}post-actions/updateEmailActionDetails/` + id, params);
}

function disableEmailActionDetails(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/disableEmailActionDetails/${id}`,
    params
  );
  }

  function enableEmailActionDetails(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/enableEmailActionDetails/${id}`,
    params
  );
  }