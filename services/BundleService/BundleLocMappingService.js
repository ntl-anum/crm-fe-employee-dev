import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const bundleLocMappingService = {
  create,
  getAll,
  getOne,
  deleteItem,
  disable,
  enable,
  update,
  updateSingleLocMapping,
  deleteSingleLocMapping,
  disableSingleLocMapping,
  enableSingleBundleLocMapping,
  checkReferenceExists,
  listBundleLocMappings,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function create(params) {
  return fetchWrapper.post(`${baseUrl}bundles/createBundleLocMap`, params);
}

function getAll() {
  return fetchWrapper.get(`${baseUrl}bundles/getAllBundleLocMapping`);
}

function getOne(id) {
  return fetchWrapper.get(`${baseUrl}bundles/getBundleLocMapping/` + id);
}

function deleteItem(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}bundles/removeBundleLocMapping/` + id,
    params
  );
}

function disable(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/disableBundleLocMapping/` + id,
    params
  );
}

function enable(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/enableBundleLocMapping/` + id,
    params
  );
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}bundles/` + id, params);
}

function updateSingleLocMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/singleBundleLocMapping/` + id,
    params
  );
}

function deleteSingleLocMapping(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}bundles/singleBundleLocMapping/` + id,
    params
  );
}

function disableSingleLocMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/disableSingleBundleLocMapping/` + id,
    params
  );
}

function enableSingleBundleLocMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/enableSingleBundleLocMapping/` + id,
    params
  );
}

function checkReferenceExists(id, params) {
  return fetchWrapper.post(
    `${baseUrl}bundles/checkReferenceLocExists/` + id,
    params
  );
}
function listBundleLocMappings(params) {
  return fetchWrapper.post(
    `${baseUrl}bundles/bundleServiceSubareaMapping`, params
  );
}
