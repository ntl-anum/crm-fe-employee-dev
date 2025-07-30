/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const planExclusiveService = {
	
		getAllActivePlanExclusive,
		savePlanExclusive,
		deletePlanExclusive,
		disablePlanExclusive,
		enablePlanExclusive,
		updatePlanExclusive
	
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function savePlanExclusive(params) {
	return fetchWrapper.post(`${baseUrl}plans/savePlanExclusive`, params);
}

function getAllActivePlanExclusive() {
	return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanExclusive`);
}



function deletePlanExclusive(id, body) {
	return fetchWrapper.delete(
	`${baseUrl}plans/deletePlanExclusive/` + id,
	body
	);
}

function disablePlanExclusive(id, body) {
	return fetchWrapper.put(
	`${baseUrl}plans/disablePlanExclusive/` + id,
	body
	);
}

function enablePlanExclusive(id, body) {
	return fetchWrapper.put(
	`${baseUrl}plans/enablePlanExclusive/` + id,
	body
	);
}

function updatePlanExclusive(id, params) {
	return fetchWrapper.put(
		`${baseUrl}plans/updatePlanExclusive/` + id,
		params
	);
}







