/**
 * @author: Arslan Ali
 * @description: ActionPoolService handling API's management File
 * @datetime : 24-Jan-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ActionPoolService = {
	getAllActionsPool,
	createActionsPool,
	deleteActionsPool,
	updateActionsPool,
	disableServiceActionPool,
	enableServiceActionPool
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */

function getAllActionsPool(params) {
	return fetchWrapper.get(`${baseUrl}post-actions/getAllActionsPool`, params);
}

function createActionsPool(payLoad) {
	return fetchWrapper.post(`${baseUrl}post-actions/createActionsPool`, payLoad);
}

function deleteActionsPool(id, body) {
	return fetchWrapper.delete(
		`${baseUrl}post-actions/deleteActionsPool/${id}`,
		body
	);
}


function updateActionsPool(id, params) {
	return fetchWrapper.put(
		`${baseUrl}post-actions/updateActionsPool/${id}`,
		params
	);
}


function disableServiceActionPool(id, params) {
	return fetchWrapper.put(
	  `${baseUrl}post-actions/disableServiceActionPool/${id}`,
	  params
	);
	}
  
	function enableServiceActionPool(id, params) {
	return fetchWrapper.put(
	  `${baseUrl}post-actions/enableServiceActionPool/${id}`,
	  params
	);
	}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
// function updateServiceIntimationMapping(id, body) {
//   return fetchWrapper.put(
//     `${baseUrl}services/serviceIntimationMapping/${id}`,
//     body
//   );
// }

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
// function enableServiceIntimationMapping(id, body) {
//   return fetchWrapper.put(
//     `${baseUrl}services/serviceIntimationMapping/enable/${id}`,
//     body
//   );
// }
