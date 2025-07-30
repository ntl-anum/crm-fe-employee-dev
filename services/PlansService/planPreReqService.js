/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const planPreReqService = {
	
		getAllActivePlanPreReq,
		savePlanPreReq,
		deletePlanPreReq,
		disablePlanPrereq,
		enablePlanPrereq,
		updatePlanPreReq
	
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function savePlanPreReq(params) {
	return fetchWrapper.post(`${baseUrl}plans/savePlanPreReq`, params);
}

function getAllActivePlanPreReq() {
	return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanPreReq`);
}



function deletePlanPreReq(id, body) {
	return fetchWrapper.delete(
	`${baseUrl}plans/deletePlanPreReq/` + id,
	body
	);
}

function disablePlanPrereq(id, body) {
	return fetchWrapper.put(
	`${baseUrl}plans/disablePlanPrereq/` + id,
	body
	);
}

function enablePlanPrereq(id, body) {
	return fetchWrapper.put(
	`${baseUrl}plans/enablePlanPrereq/` + id,
	body
	);
}

function updatePlanPreReq(id, params) {
	return fetchWrapper.put(
		`${baseUrl}plans/updatePlanPreReq/` + id,
		params
	);
}







