/**
 * @author: Mahnoor Mustajab
 * @description: Plan  detail handling API's management File
 * @datetime : 18-AUG-2022
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const plansDetailDefaultService = {
  createPlanDetailDefault,
  listPlanDetailDefault,
  listAllPlanDetailDefault,
  deletePlanDetailDefault,
  disablePlanDetailDefault,
  enablePlanDetailDefault,
  updatePlanDetailDefault,
  getPlanAttributes,
  getPlanAttributesByID
  // createPlanAttributes
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function createPlanDetailDefault(params) {
  return fetchWrapper.post(`${baseUrl}plans/createPlanDetailDefault`, params);
}

function listPlanDetailDefault(id) {
  return fetchWrapper.get(`${baseUrl}plans/listPlanDetailDefault/` + id);
}

function listAllPlanDetailDefault() {
  return fetchWrapper.get(`${baseUrl}plans/listAllPlanDetailDefault`);
}

function deletePlanDetailDefault(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanDetailDefault/` + id,
    body
  );
}

function disablePlanDetailDefault(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disablePlanDetailDefault/` + id,
    body
  );
}

function enablePlanDetailDefault(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/enablePlanDetailDefault/` + id,
    body
  );
}

function updatePlanDetailDefault(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanDetailDefault/` + id,
    params
  );
}

// Mursleen Amjad 09/09/2022
function getPlanAttributes(id) {
  return fetchWrapper.get(`${baseUrl}plans/listPlanAttributes/` + id);
}

function getPlanAttributesByID(body) {
  return fetchWrapper.post(`${baseUrl}plans/getPlanAttributesByID`,body);
}



// Mursleen Amjad 09/09/2022
// function createPlanAttributes(params) {

//   return fetchWrapper.post(`${baseUrl}plans/createPlanAttributes/`,params);
// }
