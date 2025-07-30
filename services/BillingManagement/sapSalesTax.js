import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const sapSalesTaxService = {
  createSapSalesTax,
  getAllSapSalesTax,
  getOneSapSalesTax,
  deleteSapSalesTax,
  disableSapSalesTax,
  enableSapSalesTax,
  updateSapSalesTax,
  getDistinctGlMappings,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function createSapSalesTax(params) {
  return fetchWrapper.post(`${baseUrl}billing/createSapSalesTax`, params);
}

function getAllSapSalesTax() {
  return fetchWrapper.get(`${baseUrl}billing/listSapSalesTax`);
}

function getOneSapSalesTax(id) {
  return fetchWrapper.get(`${baseUrl}billing/listSapSalesTax/` + id);
}

function deleteSapSalesTax(id, body) {
  return fetchWrapper.delete(`${baseUrl}billing/deleteSapSalesTax/` + id, body);
}

function disableSapSalesTax(id, body) {
  return fetchWrapper.put(`${baseUrl}billing/disableSapSalesTax/` + id, body);
}

function enableSapSalesTax(id, body) {
  return fetchWrapper.put(`${baseUrl}billing/enableSapSalesTax/` + id, body);
}

function updateSapSalesTax(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/updateSapSalesTax/` + id, params);
}

/**
 * @author: Arslan Ali
 * @description: This Function Will Get Distinct Mappings Of GLCODE
 * @datetime : 10-9-2024
 */

function getDistinctGlMappings() {
  return fetchWrapper.get(`${baseUrl}billing/getDistinctGlMappings`);
}
