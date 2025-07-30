import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ItemsPoolService = {
  listItemsPools,
  listOneItemsPool,
  createItemsPool,
  deleteItemsPool,
  updateItemsPool,
  enableItemsPool,
  disableItemsPool,
  EnableListItemsPools,
  listOneItemsPoolByType,
  checkMappingExistInSHGL,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listItemsPools() {
  return fetchWrapper.get(`${baseUrl}items/itemsPool`);
}
function EnableListItemsPools(params) {
  return fetchWrapper.get(`${baseUrl}items/enableItemsPoolList`);
}
//Added By Anas, 30-12-2022
function createItemsPool(params) {
  return fetchWrapper.post(`${baseUrl}items/itemsPool`, params);
}

function deleteItemsPool(id, params) {
  return fetchWrapper.delete(`${baseUrl}items/itemsPool/` + id, params);
}

function updateItemsPool(id, params) {
  return fetchWrapper.put(`${baseUrl}items/itemsPool/` + id, params);
}

function enableItemsPool(id, params) {
  return fetchWrapper.put(`${baseUrl}items/itemsPool/enable/` + id, params);
}

function disableItemsPool(id, params) {
  return fetchWrapper.put(`${baseUrl}items/itemsPool/disable/` + id, params);
}
/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listOneItemsPool(id) {
  return fetchWrapper.get(`${baseUrl}items/itemsPool/${id}`);
}
function listOneItemsPoolByType(name) {
  return fetchWrapper.get(`${baseUrl}items/typeItemsPool/${name}`);
}
function checkMappingExistInSHGL(itemsPoolId) {
  return fetchWrapper.get(
    `${baseUrl}items/checkMappingExistInSHGL/${itemsPoolId}`
  );
}
