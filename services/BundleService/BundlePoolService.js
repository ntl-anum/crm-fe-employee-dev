import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const bundlePoolService = {
  create,
  getAll,
  getOne,
  deleteItem,
  disable,
  enable,
  update,
  getAllServices,
  getPlanByService,
  getAllHardware,
  getActiveBundlePool,
  getAllHardwareBundles,
  getBundlesByLocation,
  getAllLocDependentServices,
  getAllPlansByServiceAndSubAreas,
  bundlePoolHardwareById
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function create(params) {
  return fetchWrapper.post(`${baseUrl}bundles/bundlePool`, params);
}

function getAll() {
  return fetchWrapper.get(`${baseUrl}bundles/bundlePool`);
}

function getAllHardwareBundles() {
  return fetchWrapper.get(`${baseUrl}bundles/bundlePoolHardware`);
}

function bundlePoolHardwareById(id) {
  return fetchWrapper.get(`${baseUrl}bundles/bundlePoolHardwareById/`+id);
}

function getOne(id) {
  return fetchWrapper.get(`${baseUrl}bundles/bundlePool/` + id);
}

function deleteItem(id, params) {
  return fetchWrapper.delete(`${baseUrl}bundles/bundlePool/` + id, params);
}

function disable(id, params) {
  return fetchWrapper.put(`${baseUrl}bundles/bundlePool/disable/` + id, params);
}

function enable(id, params) {
  return fetchWrapper.put(`${baseUrl}bundles/bundlePool/enable/` + id, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}bundles/bundlePool/` + id, params);
}

function getAllServices() {
  return fetchWrapper.get(`${baseUrl}bundles/bundlePool/getAllServices`);
}
function getAllHardware() {
  return fetchWrapper.get(`${baseUrl}bundles/getAllHardware`);
}

function getPlanByService(id) {
  return fetchWrapper.get(
    `${baseUrl}bundles/bundlePool/getAllPlanByService/` + id
  );
}
function getAllPlansByServiceAndSubAreas(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}bundles/getAllPlansByServiceAndSubAreas`,
    payLoad
  );
}
function getActiveBundlePool() {
  return fetchWrapper.get(`${baseUrl}bundles/allActiveBundlePool`);
}

/**
 * @param {*} -
 * @returns success or falilure response
 */
function getBundlesByLocation(body) {
  return fetchWrapper.post(`${baseUrl}bundles/bundlesByLocation`, body);
}

/**
 * @param {*} -
 * @returns success or falilure response
 */
function getAllLocDependentServices(body) {
  return fetchWrapper.post(
    `${baseUrl}bundles/getAllLocDependentServices`,
    body
  );
}