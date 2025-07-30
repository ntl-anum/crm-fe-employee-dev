/**
 * @author: Mahnoor Mustajab
 * @description: Area handling API's management File
 * @datetime : 12-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const AreaManagement = {
  createarea,
  updateArea,
  deleteArea,
  enableArea,
  disableArea,
  listActiveAreas,
  listareas,
  listareaDetails,
  listOneArea,
  getAreaByCityId,
  GetProfitCenterByCities,
  getAreaByCityIdData,
  getProfitCenters,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createarea(params) {
  return fetchWrapper.post(`${baseUrl}locations/area`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listareas(params) {
  return fetchWrapper.get(`${baseUrl}locations/area`, params);
}

function listActiveAreas(params) {
  return fetchWrapper.get(`${baseUrl}locations/area-active`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneArea(id) {
  return fetchWrapper.get(`${baseUrl}locations/area/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listareaDetails(params) {
  return fetchWrapper.get(`${baseUrl}locations/areaDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateArea(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/area/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteArea(id, body) {
  return fetchWrapper.delete(`${baseUrl}locations/area/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableArea(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/area/enable/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableArea(id, body) {
  return fetchWrapper.put(`${baseUrl}locations/area/disable/${id}`, body);
}

function getAreaByCityId(id) {
  return fetchWrapper.get(`${baseUrl}locations/areaByCity/${id}`);
}

function GetProfitCenterByCities(city) {
  return fetchWrapper.get(`${baseUrl}locations/profitCenter/${city}`);
}
function getProfitCenters(params) {
  return fetchWrapper.get(`${baseUrl}locations/profitCenter`, params);
}

function getAreaByCityIdData(id) {
  return fetchWrapper.get(`${baseUrl}locations/getCityByAreaId/${id}`);
}
