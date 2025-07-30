/**
 * @author: Mahnoor Mustajab
 * @description: Pending Waiver Approval handling API's management File
 * @datetime : 10-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const PendigWaiverApprovalService = {
  approveUserWaiver,
  rejectUserWaiver,
  getAllPendingWaivers,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @returns success or failure response
 */
function getAllPendingWaivers(id) {
  return fetchWrapper.get(`${baseUrl}waiver/getAllPendingWaivers/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function approveUserWaiver(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/approveUserWaiver/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function rejectUserWaiver(id, body) {
  return fetchWrapper.put(`${baseUrl}waiver/rejectUserWaiver/${id}`, body);
}
