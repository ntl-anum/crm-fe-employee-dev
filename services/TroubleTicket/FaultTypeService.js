/**
 * @author: Arslan Ali
 * @description: All Fault Type API's
 * @datetime : 16-5-2023
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const FaultTypeService = {
  getFaultTypesByTicketType,
  getSubFaultTypesByFaultType,
};

const customerURL = process.env.CUSTOMER_SERVICE_URL;

/**
 *
 * @param {*} params
 *
 *
 * @returns success or failure response
 */
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
