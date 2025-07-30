/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ServicePromoPreReqService = {
  
    getAllActiveServicePromoPreReq,
   
    deleteServicePromoPreReq,
    disableServicePromoPreReq,
    enableServicePromoPrereq,
    getAllPlatforms,
    saveServicePromoPreReq,
    updateServicePromoPreReq
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function saveServicePromoPreReq(params) {
  return fetchWrapper.post(`${baseUrl}services/saveServicePromoPreReq`, params);
}

function getAllActiveServicePromoPreReq() {
  return fetchWrapper.get(`${baseUrl}services/getAllActivePlanPreReq`);
}

function getAllPlatforms() {
    return fetchWrapper.get(`${baseUrl}promotion/promotionPool`);
  }



function deleteServicePromoPreReq(id, body) {
  return fetchWrapper.delete(
	`${baseUrl}services/deleteServicePromoPreReq/` + id,
	body
  );
}

function disableServicePromoPreReq(id, body) {
  return fetchWrapper.put(
	`${baseUrl}services/disableServicePromoPreReq/` + id,
	body
  );
}

function enableServicePromoPrereq(id, body) {
  return fetchWrapper.put(
	`${baseUrl}services/enableServicePromoPrereq/` + id,
	body
  );
}

function updateServicePromoPreReq(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/updateServicePromoPreReq/${id}`,
    body
  );
}