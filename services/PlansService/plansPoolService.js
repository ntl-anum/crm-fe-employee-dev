/**
 * @author: Mahnoor Mustajab
 * @description: Plan pool and location mapping  handling API's management File
 * @datetime : 18-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const plansPoolService = {
  createPlanPool,
  getAllPlanPool,
  getAllEnabledPlanPool,
  getOnePlanPool,
  deletePlanPool,
  disablePlanPool,
  enablePlanPool,
  updatePlanPool,
  createPlanLocMapping,
  getAllPlanLocMapping,
  getOnePlanLocMapping,
  deletePlanLocMapping,
  disablePlanLocMapping,
  enablePlanLocMapping,
  updatePlanLocMapping,
  listPlanPoolLocationDependent,
  listPlanLocationMappingByArea,
  createPlanLocMappingConfigDetail,
  getAllPlanLocMappingConfigDetail,
  getPlanLocMappingConfigDetailByPlanPoolId,
  updatePlanLocMappingConfigDetail,
  deletePlanLocMappingConfigDetail,
  disablePlanLocMappingConfigDetail,
  enablePlanLocMappingConfigDetail,
  getPlansByServiceLocation,
  findAllPlanLocMappingWithServiceAttribute,
  getAllEnabledLocIndependentPlanPool,
  findAllPlans,
  findAllActivePlansWithService,
  getAllActivePlanPlatformMapping,
  savePlanPlatformMapping,
  deletePlanPlatformMapping,
  disablePlanPlatformMapping,
  enablePlanPlatformMapping,
  findAllDivisions,
  findAccountAssignmentGroups,
  findProductHierarchy,
  findProductHierarchy_2,
  findMaterialGroup,
  findAllProductHierarchy,
  getPlanAttributesByID,
  findProfile,
  findIpPool,
  findInAndOutProfile,
  getAllPlansBySubAreas,
  updatePlanPlatformMapping,
  updatePlanServicePreReq,
  updatePlanPreReq,
  updatePlanExclusive,
  getOneServicePool,
  findAllEnabledDivisions,
  findEnabledAccountAssignmentGroups,
  findEnabledProductHierarchy,
  findEnabledProductHierarchy_2,
  findEnabledMaterialGroup,
  getPlanLocMappingConfigDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function createPlanPool(params) {
  return fetchWrapper.post(`${baseUrl}plans/createPlanPool`, params);
}

function getAllPlanPool() {
  return fetchWrapper.get(`${baseUrl}plans/listPlanPool`);
}

function getAllPlansBySubAreas(body) {
  return fetchWrapper.post(`${baseUrl}plans/getAllPlansBySubAreas`, body);
}

function getAllEnabledPlanPool() {
  return fetchWrapper.get(`${baseUrl}plans/listEnabledPlanPool`);
}
function getAllEnabledLocIndependentPlanPool() {
  return fetchWrapper.get(
    `${baseUrl}plans/listAllEnabledLocIndependentPlanPool`
  );
}

function getOnePlanPool(id) {
  return fetchWrapper.get(`${baseUrl}plans/listPlanPool/` + id);
}

function getOneServicePool(id) {
  return fetchWrapper.get(`${baseUrl}services/service/` + id);
}

function listPlanPoolLocationDependent() {
  return fetchWrapper.get(`${baseUrl}plans/listPlanPoolLocationDependent/`);
}

function deletePlanPool(id, body) {
  return fetchWrapper.delete(`${baseUrl}plans/deletePlanPool/` + id, body);
}

function disablePlanPool(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disablePlanPool/` + id, body);
}

function enablePlanPool(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enablePlanPool/` + id, body);
}

function updatePlanPool(id, params) {
  return fetchWrapper.put(`${baseUrl}plans/updatePlanPool/` + id, params);
}

function findAllPlans() {
  return fetchWrapper.get(`${baseUrl}customerConfig/listAllPlanPool`);
}
function findAllActivePlansWithService() {
  return fetchWrapper.get(`${baseUrl}customerConfig/allActivePlansWithService`);
}
function findAllDivisions() {
  return fetchWrapper.get(`${baseUrl}plans/findAllDivisions`);
}

function findAllEnabledDivisions() {
  return fetchWrapper.get(`${baseUrl}plans/findAllEnabledDivisions`);
}

function findAccountAssignmentGroups() {
  return fetchWrapper.get(`${baseUrl}plans/findAccountAssignmentGroups`);
}

function findEnabledAccountAssignmentGroups() {
  return fetchWrapper.get(`${baseUrl}plans/findEnabledAccountAssignmentGroups`);
}

function findProductHierarchy() {
  return fetchWrapper.get(`${baseUrl}plans/findProductHierarchy`);
}

function findEnabledProductHierarchy() {
  return fetchWrapper.get(`${baseUrl}plans/findEnabledProductHierarchy`);
}

function findProductHierarchy_2(id) {
  return fetchWrapper.get(`${baseUrl}plans/findProductHierarchy_2/` + id);
}

function findEnabledProductHierarchy_2(id) {
  return fetchWrapper.get(
    `${baseUrl}plans/findEnabledProductHierarchy_2/` + id
  );
}

function findMaterialGroup() {
  return fetchWrapper.get(`${baseUrl}plans/findMaterialGroup`);
}

function findEnabledMaterialGroup() {
  return fetchWrapper.get(`${baseUrl}plans/findEnabledMaterialGroup`);
}

/**
 * @desc Plan locatiom Mapping
 * @param {*} params
 * @returns success or falilure response
 */
function createPlanLocMapping(params) {
  return fetchWrapper.post(`${baseUrl}plans/createPlanLocMapping`, params);
}

function getAllPlanLocMapping(params) {
  return fetchWrapper.post(`${baseUrl}plans/listPlanLocMapping`, params);
}
function findAllPlanLocMappingWithServiceAttribute() {
  return fetchWrapper.get(
    `${baseUrl}plans/findAllPlanLocMappingWithServiceAttribute`
  );
}
function getOnePlanLocMapping(id) {
  return fetchWrapper.get(`${baseUrl}plans/listPlanLocMapping/` + id);
}

function listPlanLocationMappingByArea(id) {
  return fetchWrapper.get(
    `${baseUrl}plans/listPlanLocationMappingByArea/` + id
  );
}

function deletePlanLocMapping(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanLocMapping/` + id,
    body
  );
}

function disablePlanLocMapping(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disablePlanLocMapping/` + id, body);
}

function enablePlanLocMapping(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enablePlanLocMapping/` + id, body);
}

function updatePlanLocMapping(id, params) {
  return fetchWrapper.put(`${baseUrl}plans/updatePlanLocMapping/` + id, params);
}

// PLAN LOC MAPPING CONFIG DETAIL
function createPlanLocMappingConfigDetail(params) {
  return fetchWrapper.post(
    `${baseUrl}plans/createPlanLocMappingConfigDetail`,
    params
  );
}

function getAllPlanLocMappingConfigDetail() {
  return fetchWrapper.get(`${baseUrl}plans/findAllPlanLocMappingConfigDetail`);
}

function getPlanLocMappingConfigDetailByPlanPoolId(id) {
  return fetchWrapper.get(
    `${baseUrl}plans/findOnePlanLocMappingConfigDetail/` + id
  );
}

function getPlanLocMappingConfigDetails(params) {
  return fetchWrapper.post(
    `${baseUrl}plans/getPlanLocMappingConfigDetails`,
    params
  );
}

function updatePlanLocMappingConfigDetail(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanLocMappingConfigDetail/` + id,
    params
  );
}

function deletePlanLocMappingConfigDetail(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deletePlanLocMappingConfigDetail/` + id,
    body
  );
}

function disablePlanLocMappingConfigDetail(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disablePlanLocMappingConfigDetail/` + id,
    body
  );
}

function enablePlanLocMappingConfigDetail(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/enablePlanLocMappingConfigDetail/` + id,
    body
  );
}

/**
 * @param {*} -
 * @returns success or falilure response
 */
function getPlansByServiceLocation(params) {
  return fetchWrapper.post(`${baseUrl}plans/plansByServiceLocation`, params);
}

function getAllActivePlanPlatformMapping(params) {
  return fetchWrapper.get(`${baseUrl}plans/getAllActivePlanPlatformMapping`);
}

function savePlanPlatformMapping(params) {
  return fetchWrapper.post(`${baseUrl}plans/savePlanPlatformMapping`, params);
}

function deletePlanPlatformMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/deletePlanPlatformMapping/` + id,
    params
  );
}

function disablePlanPlatformMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/disablePlanPlatformMapping/` + id,
    params
  );
}

function enablePlanPlatformMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/enablePlanPlatformMapping/` + id,
    params
  );
}
function findAllProductHierarchy() {
  return fetchWrapper.get(`${baseUrl}plans/findAllProductHierarchy`);
}

function getPlanAttributesByID(body) {
  return fetchWrapper.post(`${baseUrl}plans/getPlanAttributesByID`, body);
}

function findIpPool(body) {
  return fetchWrapper.get(`${baseUrl}plans/findIpPool`, body);
}

function findProfile(body) {
  return fetchWrapper.get(`${baseUrl}plans/findProfile`, body);
}

function findInAndOutProfile(params) {
  return fetchWrapper.post(`${baseUrl}plans/findInAndOutProfile`, params);
}

function updatePlanPlatformMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanPlatformMapping/` + id,
    params
  );
}

function updatePlanServicePreReq(id, params) {
  return fetchWrapper.put(
    `${baseUrl}plans/updatePlanServicePreReq/` + id,
    params
  );
}

function updatePlanPreReq(id, params) {
  return fetchWrapper.put(`${baseUrl}plans/updatePlanPreReq/` + id, params);
}

function updatePlanExclusive(id, params) {
  return fetchWrapper.put(`${baseUrl}plans/updatePlanExclusive/` + id, params);
}
