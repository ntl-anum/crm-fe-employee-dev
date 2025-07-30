
/**
 * @author: Arslan Ali
 * @description: Ticket Action Service handling API's management File
 * @datetime : 24-Jan-2024
 */

 import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const TicketActionDetailService = {
	getTicketDetailActions,
	createTicketDetailActions,
	deleteTicketDetailActions,
	enableTroubleTicketDetailActions,
	disableTroubleTicketDetailActions,
	updateTicketDetailActions
};

const baseUrl = process.env.CONFIG_SERVICES_URL;
const customerURL = process.env.CUSTOMER_SERVICE_URL;

// }

function deleteTicketDetailActions(id, body) {
	return fetchWrapper.delete(
	`${baseUrl}post-actions/deleteTicketDetailActions/${id}`,
	body
	);
}


function getTicketDetailActions(params) {
	return fetchWrapper.get(
		`${baseUrl}post-actions/getTicketDetailActions`,
		params
	);
}

function createTicketDetailActions(payLoad) {
	return fetchWrapper.post(
	`${baseUrl}post-actions/createTicketDetailActions`,
	payLoad
	);
}


function disableTroubleTicketDetailActions(id, params) {
	return fetchWrapper.put(
	  `${baseUrl}post-actions/disableTroubleTicketDetailActions/${id}`,
	  params
	);
  }
  
  function enableTroubleTicketDetailActions(id, params) {
	return fetchWrapper.put(
	  `${baseUrl}post-actions/enableTroubleTicketDetailActions/${id}`,
	  params
	);
  }
  
  function updateTicketDetailActions(id, params) {
	return fetchWrapper.put(
	  `${baseUrl}post-actions/updateTicketDetailActions/` + id,
	  params
	);
  }

