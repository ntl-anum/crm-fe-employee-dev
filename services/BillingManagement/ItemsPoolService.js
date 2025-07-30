/**
 * @author: Sehrish Naseer
 * @description: Items Pool handling API's management File
 * @datetime : 29-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ItemsPoolService = {
  listItemsPools,
  listOneItemsPool,
  //Added By Anas, 30-12-2022
  createItemsPool,
  deleteItemsPool,
  updateItemsPool,
  enableItemsPool,
  disableItemsPool,
  EnableListItemsPools,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listItemsPools(params) {
  return fetchWrapper.get(`${baseUrl}billing/itemsPool/`, params);
}
function EnableListItemsPools(params) {
  return fetchWrapper.get(`${baseUrl}billing/enableItemsPoolList`);
}
//Added By Anas, 30-12-2022
function createItemsPool(params) {
  return fetchWrapper.post(`${baseUrl}billing/itemsPool`, params);
}

function deleteItemsPool(id, params) {
  return fetchWrapper.delete(`${baseUrl}billing/itemsPool/` + id, params);
}

function updateItemsPool(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/itemsPool/` + id, params);
}

function enableItemsPool(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/itemsPool/enable/` + id, params);
}

function disableItemsPool(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/itemsPool/disable/` + id, params);
}
/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneItemsPool(id) {
  return fetchWrapper.get(`${baseUrl}billing/itemsPool/${id}`);
}
