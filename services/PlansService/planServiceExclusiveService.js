/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const planServiceExclusiveService = {
  getAllActivePlanServiceExclusive,
  savePlanServiceExclusive,
  deletePlanServiceExclusive,
  disablePlanServiceExclusive,
  enablePlanServiceExclusive,
  updatePlanServiceExclusive,
  savePlanPromoExclusive,
  disablePlanPromoExclusive,
  enablePlanPromoExclusive,
  getAllActivePlanPromoExclusive,
  deletePlanPromoExclusive,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function savePlanServiceExclusive(params) {
  return fetchWrapper.post(`${baseUrl}plans/savePlanServiceExclusive`, params);
}

function getAllActivePlanServiceExclusive() {
  return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanServiceExclusive`);
}

function deletePlanServiceExclusive(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanServiceExclusive/` + id,
    body
  );
}
function disablePlanServiceExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disablePlanServiceExclusive/` + id,
    body
  );
}
function enablePlanServiceExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/enablePlanServiceExclusive/` + id,
    body
  );
}
function updatePlanServiceExclusive(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanServiceExclusive/` + id,
    params
  );
}

/// PROMO EXCLUSIVE

function savePlanPromoExclusive(params) {
  return fetchWrapper.post(`${baseUrl}plans/savePlanPromoExclusive`, params);
}

function getAllActivePlanPromoExclusive() {
  return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanPromoExclusive`);
}

function deletePlanPromoExclusive(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanPromoExclusive/` + id,
    body
  );
}
function disablePlanPromoExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disablePlanPromoExclusive/` + id,
    body
  );
}
function enablePlanPromoExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/enablePlanPromoExclusive/` + id,
    body
  );
}
function updatePlanPromoExclusive(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanPromoExclusive/` + id,
    params
  );
}
