import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const shglBillMappingService = {
  createShglBillMapping,
  getAllShglBillMapping,
  getOneShglBillMapping,
  deleteShglBillMapping,
  disableShglBillMapping,
  enableShglBillMapping,
  getGLMapping,
  updateShglBillMapping
};

const baseUrl = process.env.CONFIG_SERVICES_URL;
 
/**
 * 
 * @param {*} params
 * @returns success or falilure response
 */
function createShglBillMapping(params) {
  return fetchWrapper.post(`${baseUrl}billing/createShglBillMapping`,params);
}

function getAllShglBillMapping() {
  return fetchWrapper.get(`${baseUrl}billing/listShglBillMapping`);
}

function getOneShglBillMapping(id) {
  return fetchWrapper.get(`${baseUrl}billing/listShglBillMapping/`+id);
}


function deleteShglBillMapping(id, body) {
  return fetchWrapper.delete(`${baseUrl}billing/deleteShglBillMapping/`+id, body);
}

function disableShglBillMapping(id, body) {
  return fetchWrapper.put(`${baseUrl}billing/disableShglBillMapping/`+id, body);
}

function enableShglBillMapping(id, body) {
  return fetchWrapper.put(`${baseUrl}billing/enableShglBillMapping/`+id, body);
}

function updateShglBillMapping(id,params) {
  return fetchWrapper.put(`${baseUrl}billing/updateShglBillMapping/`+id,params);
}

function getGLMapping(id) {
  return fetchWrapper.get(`${baseUrl}billing/glMapping/`+id); 
}


