/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ServicePromoExclusiveService = {
  
    getAllActiveServicePromoExclusive,
   
    deleteServicePromoExclusive,
    disableServicePromoExclusive,
    enableServicePromoExclusive,
    getAllPlatforms,
    saveServicePromoExclusive,
    updateServicePromoExclusive
  
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function saveServicePromoExclusive(params) {
  return fetchWrapper.post(`${baseUrl}services/saveServicePromoExclusive`, params);
}

function getAllActiveServicePromoExclusive() {
  return fetchWrapper.get(`${baseUrl}services/getAllActiveServicePromoExclusive`);
}

function getAllPlatforms() {
    return fetchWrapper.get(`${baseUrl}promotion/promotionPool`);
  }



function deleteServicePromoExclusive(id, body) {
  return fetchWrapper.delete(
	`${baseUrl}services/deleteServicePromoExclusive/` + id,
	body
  );
}

function disableServicePromoExclusive(id, body) {
  return fetchWrapper.put(
	`${baseUrl}services/disableServicePromoExclusive/` + id,
	body
  );
}

function enableServicePromoExclusive(id, body) {
  return fetchWrapper.put(
	`${baseUrl}services/enableServicePromoExclusive/` + id,
	body
  );
}


function updateServicePromoExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/updateServicePromoExclusive/${id}`,
    body
  );
}