/**
 * @author: Arslan Ali
 * @description: Create Profile API's management File
 * @datetime : 3-MAY-2024
 */
import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const CreateProfileService = {
  saveProfile,
  findProfile,
  deleteProfile,
  enableProfile,
  disableProfile,
  updateProfile
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */

function saveProfile(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveProfile`, params);
}

// function listPlanDetailDefault(id) {
//   return fetchWrapper.get(`${baseUrl}plans/listPlanDetailDefault/` + id);
// }

function findProfile() {
  return fetchWrapper.get(`${baseUrl}plans/findProfile`);
}

function deleteProfile(id, body) {
  return fetchWrapper.delete(`${baseUrl}plans/deleteProfile/` + id, body);
}

function disableProfile(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disableProfile/` + id, body);
}

function enableProfile(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enableProfile/` + id, body);
}

function updateProfile(id, params) {
  return fetchWrapper.put(
	`${baseUrl}plans/updateProfile/` + id,
	params
  );
}

// // Mursleen Amjad 09/09/2022
// function getPlanAttributes(id) {
//   return fetchWrapper.get(`${baseUrl}plans/listPlanAttributes/` + id);
// }

// function getPlanAttributesByID(body) {
//   return fetchWrapper.post(`${baseUrl}plans/getPlanAttributesByID`,body);
// }
