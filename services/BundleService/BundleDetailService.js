import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const bundleDetailService = {
  create,
  getAll,
  getOne,
  deleteItem,
  disable,
  enable,
  updateSingleBundleDetail,
  deleteSingleBundleDetail,
  disableSingleBundleDetail,
  enableSingleBundleDetail,
  checkReferenceExists,
  disableBundleDetails,
  disableBundleLocMappings,
  enableBundleDetails,
  enableBundleLocMappings,
  removeBundleDetails,
  removeBundleLocMappings
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function create(params) {
  return fetchWrapper.post(`${baseUrl}bundles/createBundleDetail`, params);
}

function getAll() {
  return fetchWrapper.get(`${baseUrl}bundles/getAllBundleDetails`);
}

function getOne(id) {
  return fetchWrapper.get(`${baseUrl}bundles/getBundleDetail/` + id);
}

function deleteItem(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}bundles/removeBundleDetail/` + id,
    params
  );
}

function removeBundleDetails(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}bundles/removeBundleDetails/` + id,
    params
  );
}

function removeBundleLocMappings(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}bundles/removeBundleLocMappings/` + id,
    params
  );
}


function disable(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/disableBundleDetail/` + id,
    params
  );
}


function disableBundleDetails(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/disableBundleDetails/` + id,
    params
  );
}

function disableBundleLocMappings(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/disableBundleLocMappings/` + id,
    params
  );
}

function enableBundleDetails(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/enableBundleDetails/` + id,
    params
  );
}

function enableBundleLocMappings(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/enableBundleLocMappings/` + id,
    params
  );
}



function enable(id, params) {
  return fetchWrapper.put(`${baseUrl}bundles/enableBundleDetail/` + id, params);
}

function updateSingleBundleDetail(id, params) {
  return fetchWrapper.put(`${baseUrl}bundles/singleBundleDetail/` + id, params);
}

function deleteSingleBundleDetail(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}bundles/singleBundleDetail/` + id,
    params
  );
}

function disableSingleBundleDetail(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/disableSingleBundleDetail/` + id,
    params
  );
}

function enableSingleBundleDetail(id, params) {
  return fetchWrapper.put(
    `${baseUrl}bundles/enableSingleBundleDetail/` + id,
    params
  );
}

function checkReferenceExists(id, params) {
  return fetchWrapper.post(
    `${baseUrl}bundles/checkReferenceExists/` + id,
    params
  );
}
