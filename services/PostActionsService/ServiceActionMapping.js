/**
 * @author: Arslan Ali
 * @description: ActionPoolService handling API's management File
 * @datetime : 24-Jan-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ServiceActionMappingService = {
	getAllServiceActionMapping,
	deleteServiceActionMapping,
	getAllActionPools,
	createServiceActionMapping,
	updateServiceActionMapping,
	disableServiceActionMapping,
	enableServiceActionMapping
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */

function getAllServiceActionMapping(params) {
	return fetchWrapper.get(
		`${baseUrl}post-actions/getAllServiceActionMapping`,
		params
	);
}
function deleteServiceActionMapping(id, body) {
	return fetchWrapper.delete(
		`${baseUrl}post-actions/deleteServiceActionMapping/${id}`,
		body
	);
}

function getAllActionPools(params) {
	return fetchWrapper.get(`${baseUrl}post-actions/getAllActionPools`, params);
}
function createServiceActionMapping(payLoad) {
	return fetchWrapper.post(`${baseUrl}post-actions/createServiceActionMapping`, payLoad);
	}


	function updateServiceActionMapping(id, params) {
		return fetchWrapper.put(`${baseUrl}post-actions/updateServiceActionMapping/` + id, params);
	}

	function disableServiceActionMapping(id, params) {
		return fetchWrapper.put(
		  `${baseUrl}post-actions/disableServiceActionMapping/${id}`,
		  params
		);
	  }

	  function enableServiceActionMapping(id, params) {
		return fetchWrapper.put(
		  `${baseUrl}post-actions/enableServiceActionMapping/${id}`,
		  params
		);
	  }
	