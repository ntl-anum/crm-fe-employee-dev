/**
 * @author: Arslan Ali
 * @description: Create Profile API's management File
 * @datetime : 3-MAY-2024
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CreateIpPoolService = {
  saveIpPool,
  findIpPool,
  deleteIpPool,
  enableIpPool,
  disableIpPool,
  updateIpPool,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */

function saveIpPool(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveIpPool`, params);
}

// function listPlanDetailDefault(id) {
//   return fetchWrapper.get(`${baseUrl}plans/listPlanDetailDefault/` + id);
// }

function findIpPool() {
  return fetchWrapper.get(`${baseUrl}plans/findIpPool`);
}

function deleteIpPool(id, body) {
  return fetchWrapper.delete(`${baseUrl}plans/deleteIpPool/` + id, body);
}

function disableIpPool(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disableIpPool/` + id, body);
}

function enableIpPool(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enableIpPool/` + id, body);
}

function updateIpPool(id, params) {
  return fetchWrapper.put(`${baseUrl}plans/updateIpPool/` + id, params);
}

// // Mursleen Amjad 09/09/2022
// function getPlanAttributes(id) {
//   return fetchWrapper.get(`${baseUrl}plans/listPlanAttributes/` + id);
// }

// function getPlanAttributesByID(body) {
//   return fetchWrapper.post(`${baseUrl}plans/getPlanAttributesByID`,body);
// }
