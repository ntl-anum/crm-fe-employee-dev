/**
 * @author: Arslan Ali
 * @description: Ticket Action Service handling API's management File
 * @datetime : 24-Jan-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const TicketActionService = {
  getFaultTypesByTicketType,
  getSubFaultTypesByFaultType,
  getAllTicketActions,
  getServicesOfTicketAction,
  createTicketActions,
  deleteTicketActions,
  disableTroubleTicketActions,
  enableTroubleTicketActions,
  updateTicketActions,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;
const customerURL = process.env.CUSTOMER_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */

// function getServicesOfSmsAction(params) {
//   return fetchWrapper.get(
//     `${baseUrl}post-actions/getServicesOfSmsAction`,
//     params
//   );
// }

function deleteTicketActions(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}post-actions/deleteTicketActions/${id}`,
    body
  );
}

function getAllTicketActions(params) {
  return fetchWrapper.get(`${baseUrl}post-actions/getAllTicketActions`, params);
}
function getServicesOfTicketAction(params) {
  return fetchWrapper.get(
    `${baseUrl}post-actions/getServicesOfTicketAction`,
    params
  );
}

function createTicketActions(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}post-actions/createTicketActions`,
    payLoad
  );
}

function getFaultTypesByTicketType(ticketType) {
  return fetchWrapper.get(
    `${customerURL}billing-management/faultTypesByTicketType/${ticketType}`
  );
}

function getSubFaultTypesByFaultType(body) {
  return fetchWrapper.post(
    `${customerURL}billing-management/subFaultTypesByFaultType`,
    body
  );
}

function disableTroubleTicketActions(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/disableTroubleTicketActions/${id}`,
    params
  );
}

function enableTroubleTicketActions(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/enableTroubleTicketActions/${id}`,
    params
  );
}

function updateTicketActions(id, params) {
  return fetchWrapper.put(
    `${baseUrl}post-actions/updateTicketActions/` + id,
    params
  );
}
