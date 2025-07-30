/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const planServicePreReqService = {
  getAllActivePlanServicePreReq,
  getAllActivePlanPromoPreReq,
  savePlanServicePreReq,
  deletePlanServicePreReq,
  deletePlanPromoPreReq,
  disablePlanServicePreReq,
  updatePlanServicePreReq,
  updatePlanPromoPreReq,
  enablePlanServicePrereq,
  disablePlanPromoPreReq,
  enablePlanPromoPrereq,
  savePlanPromoPreReq,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function savePlanServicePreReq(params) {
  return fetchWrapper.post(`${baseUrl}plans/savePlanServicePreReq`, params);
}
function savePlanPromoPreReq(params) {
  return fetchWrapper.post(`${baseUrl}plans/savePlanPromoPreReq`, params);
}
function getAllActivePlanServicePreReq() {
  return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanServicePreReq`);
}

function getAllActivePlanPromoPreReq() {
  return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanPromoPreReq`);
}

function deletePlanServicePreReq(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanServicePreReq/` + id,
    body
  );
}
//new

function deletePlanPromoPreReq(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanPromoPreReq/` + id,
    body
  );
}

//end
function disablePlanServicePreReq(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disablePlanServicePreReq/` + id,
    body
  );
}
//new

function disablePlanPromoPreReq(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disablePlanPromoPreReq/` + id, body);
}

//end
function enablePlanServicePrereq(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/enablePlanServicePrereq/` + id,
    body
  );
}

//new

function enablePlanPromoPrereq(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enablePlanPromoPrereq/` + id, body);
}

//end
function updatePlanServicePreReq(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanServicePreReq/` + id,
    params
  );
}

//new

function updatePlanPromoPreReq(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanPromoPreReq/` + id,
    params
  );
}
