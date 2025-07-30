import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ClubManagementService = {
  getClubPools,
  getLocationDependentClubPools,
  createClubPool,
  deleteClubPool,
  enableClubPool,
  disableClubPool,
  updateClubPool,
  getClubLocationMappings,
  createClubLocationMapping,
  enableClubLocationMapping,
  disableClubLocationMapping,
  deleteClubLocationMapping,
  updateClubLocationMapping,
  createClubLocationMappingDetails,
  getClubLocationMappingDetails,
  getAllClubDefaultDetails,
  getDynamicUomServices,
  locationInDependentClubPools,
  createClubDefaultDetail,
  deleteClubDefaultDetail,
  disableClubDefaultDetail,
  enableClubDefaultDetail,
  getOneClubDefaultDetail,
  updateClubDefaultDetail,
  getAllClubDefaultPriceDetails,
  deleteClubDefaultPriceDetail,
  enableClubDefaultPriceDetail,
  disableClubDefaultPriceDetail,
  getServiceClubs,
  createClubDefaultPriceDetail,
  updateClubDefaultPriceDetail,
  deleteClubLocationMappingDetails,
  enableClubLocationMappingDetails,
  disableClubLocationMappingDetails,
  updateClubLocationMappingDetails,
  getAllClubServiceLocationDetail,
  deleteClubServiceLocationDetail,
  disableClubServiceLocationDetail,
  enableClubServiceLocationDetail,
  createClubServiceLocationDetail,
  updateClubServiceLocationDetail,
  getClubsAlongSubArea,
};

const configServiceUrl = process.env.CONFIG_SERVICES_URL;

function getClubPools() {
  return fetchWrapper.get(`${configServiceUrl}club-management/clubPools`);
}

function getLocationDependentClubPools() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/locationDependentClubPools`
  );
}

function createClubPool(params) {
  return fetchWrapper.post(
    `${configServiceUrl}club-management/createClubPool`,
    params
  );
}

function deleteClubPool(id, operator) {
  return fetchWrapper.delete(
    `${configServiceUrl}club-management/deleteClubPool/${id}`,
    operator
  );
}

function enableClubPool(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/enableClubPool/${id}`,
    params
  );
}
function disableClubPool(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/disableClubPool/${id}`,
    params
  );
}

function updateClubPool(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/updateClubPool/${id}`,
    params
  );
}

// club location mappings apis

function getClubLocationMappings() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/clubLocationMappings`
  );
}
function createClubLocationMapping(payLoad) {
  return fetchWrapper.post(
    `${configServiceUrl}club-management/createClubLocationMapping`,
    payLoad
  );
}

function enableClubLocationMapping(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/enableClubLocationMapping/${id}`,
    params
  );
}
function disableClubLocationMapping(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/disableClubLocationMapping/${id}`,
    params
  );
}

function deleteClubLocationMapping(id, operator) {
  return fetchWrapper.delete(
    `${configServiceUrl}club-management/deleteClubLocationMapping/${id}`,
    operator
  );
}

function updateClubLocationMapping(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/updateClubLocationMapping/${id}`,
    params
  );
}

function createClubLocationMappingDetails(payLoad) {
  return fetchWrapper.post(
    `${configServiceUrl}club-management/createClubLocationMappingDetails`,
    payLoad
  );
}
function updateClubLocationMappingDetails(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/updateClubLocationMappingDetails/${id}`,
    params
  );
}
function getClubLocationMappingDetails() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getClubLocationMappingDetails`
  );
}

function deleteClubLocationMappingDetails(id, operator) {
  return fetchWrapper.delete(
    `${configServiceUrl}club-management/deleteClubLocationMappingDetails/${id}`,
    operator
  );
}

function enableClubLocationMappingDetails(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/enableClubLocationMappingDetails/${id}`,
    params
  );
}
function disableClubLocationMappingDetails(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/disableClubLocationMappingDetails/${id}`,
    params
  );
}

//ANAS-WORK-START
function getAllClubDefaultDetails() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getAllClubDefaultDetails`
  );
}

function getDynamicUomServices() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getDynamicUomServices`
  );
}

function locationInDependentClubPools() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/locationInDependentClubPools`
  );
}

function createClubDefaultDetail(params) {
  return fetchWrapper.post(
    `${configServiceUrl}club-management/createClubDefaultDetail`,
    params
  );
}

function deleteClubDefaultDetail(id, operator) {
  return fetchWrapper.delete(
    `${configServiceUrl}club-management/deleteClubDefaultDetail/${id}`,
    operator
  );
}

function enableClubDefaultDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/enableClubDefaultDetail/${id}`,
    params
  );
}
function disableClubDefaultDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/disableClubDefaultDetail/${id}`,
    params
  );
}

function getOneClubDefaultDetail(id) {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getOneClubDefaultDetail/${id}`
  );
}

function updateClubDefaultDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/updateClubDefaultDetail/${id}`,
    params
  );
}

function getAllClubDefaultPriceDetails() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getAllClubDefaultPriceDetails`
  );
}

function deleteClubDefaultPriceDetail(id, operator) {
  return fetchWrapper.delete(
    `${configServiceUrl}club-management/deleteClubDefaultPriceDetail/${id}`,
    operator
  );
}
function enableClubDefaultPriceDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/enableClubDefaultPriceDetail/${id}`,
    params
  );
}
function disableClubDefaultPriceDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/disableClubDefaultPriceDetail/${id}`,
    params
  );
}

function getServiceClubs() {
  return fetchWrapper.get(`${configServiceUrl}club-management/getServiceClubs`);
}

function createClubDefaultPriceDetail(params) {
  return fetchWrapper.post(
    `${configServiceUrl}club-management/createClubDefaultPriceDetail`,
    params
  );
}

function updateClubDefaultPriceDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/updateClubDefaultPriceDetail/${id}`,
    params
  );
}

function getAllClubServiceLocationDetail() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getAllClubServiceLocationDetail`
  );
}

function deleteClubServiceLocationDetail(id, operator) {
  return fetchWrapper.delete(
    `${configServiceUrl}club-management/deleteClubServiceLocationDetail/${id}`,
    operator
  );
}
function enableClubServiceLocationDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/enableClubServiceLocationDetail/${id}`,
    params
  );
}
function disableClubServiceLocationDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/disableClubServiceLocationDetail/${id}`,
    params
  );
}

function createClubServiceLocationDetail(params) {
  return fetchWrapper.post(
    `${configServiceUrl}club-management/createClubServiceLocationDetail`,
    params
  );
}

function updateClubServiceLocationDetail(id, params) {
  return fetchWrapper.put(
    `${configServiceUrl}club-management/updateClubServiceLocationDetail/${id}`,
    params
  );
}

function getClubsAlongSubArea() {
  return fetchWrapper.get(
    `${configServiceUrl}club-management/getClubsAlongSubArea`
  );
}
