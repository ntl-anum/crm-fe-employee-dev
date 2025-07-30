/**
 * @author: Arslan Ali
 * @description: Product Categorization Service
 * @datetime : 17-APR-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ProductCategorizationService = {
  saveDivisionDetail,
  saveAccountAssignment,
  saveProductHierarchyL1,
  saveProductHierarchyL2,
  saveMaterialGroup,
  deleteDivision,
  deleteAccountAssignment,
  deleteProductHierarchy,
  deleteMaterialGroup,
  enableDivision,
  disableDivision,
  enableAccountAssignment,
  disableAccountAssignment,
  enableProductHierarchy,
  disableProductHierarchy,
  enableMaterialGroup,
  disableMaterialGroup,
  updateDivisions,
  updateAccountAssignment,
  updateProductHierarchy,
  updateProductHierarchyL2,
  updateMaterialGroup,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function saveDivisionDetail(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveDivisionDetail`, params);
}

function saveAccountAssignment(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveAccountAssignment`, params);
}
function saveProductHierarchyL1(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveProductHierarchyL1`, params);
}
function saveProductHierarchyL2(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveProductHierarchyL2`, params);
}

function saveMaterialGroup(params) {
  return fetchWrapper.post(`${baseUrl}plans/saveMaterialGroup`, params);
}

function deleteDivision(id, body) {
  return fetchWrapper.delete(`${baseUrl}plans/deleteDivision/` + id, body);
}
function deleteAccountAssignment(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deleteAccountAssignment/` + id,
    body
  );
}
function deleteProductHierarchy(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}plans/deleteProductHierarchy/` + id,
    body
  );
}
function deleteMaterialGroup(id, body) {
  return fetchWrapper.delete(`${baseUrl}plans/deleteMaterialGroup/` + id, body);
}
function enableDivision(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enableDivision/` + id, body);
}
function disableDivision(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disableDivision/` + id, body);
}
function enableAccountAssignment(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/enableAccountAssignment/` + id,
    body
  );
}
function disableAccountAssignment(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disableAccountAssignment/` + id,
    body
  );
}

function enableProductHierarchy(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enableProductHierarchy/` + id, body);
}
function disableProductHierarchy(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/disableProductHierarchy/` + id,
    body
  );
}
function enableMaterialGroup(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/enableMaterialGroup/` + id, body);
}
function disableMaterialGroup(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/disableMaterialGroup/` + id, body);
}

function updateDivisions(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/updateDivisions/${id}`, body);
}

function updateAccountAssignment(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/updateAccountAssignment/${id}`,
    body
  );
}
function updateProductHierarchy(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/updateProductHierarchy/${id}`, body);
}
function updateProductHierarchyL2(id, body) {
  return fetchWrapper.put(
    `${baseUrl}plans/updateProductHierarchyL2/${id}`,
    body
  );
}
function updateMaterialGroup(id, body) {
  return fetchWrapper.put(`${baseUrl}plans/updateMaterialGroup/${id}`, body);
}
