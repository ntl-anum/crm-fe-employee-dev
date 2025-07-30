/**
 * @author: Sehrish Naseer
 * @description: Promotion Location Mapping handling API's management File
 * @datetime : 24-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const PromotionLocationMappingService = {
  createPromotionLocationMapping,
  updatePromotionLocationMapping,
  deletePromotionLocationMapping,
  enablePromotionLocationMapping,
  disablePromotionLocationMapping,
  listPromotionLocationMappings,
  listPromotionLocationMappingDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createPromotionLocationMapping(params) {
  return fetchWrapper.post(
    `${baseUrl}promotion/promotionLocationMapping`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listPromotionLocationMappings(params) {
  return fetchWrapper.get(
    `${baseUrl}promotion/promotionLocationMapping`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listPromotionLocationMappingDetails(params) {
  return fetchWrapper.post(
    `${baseUrl}promotion/promotionLocationMappings`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updatePromotionLocationMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionLocationMapping/update/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deletePromotionLocationMapping(body) {
  return fetchWrapper.delete(
    `${baseUrl}promotion/promotionLocationMapping`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enablePromotionLocationMapping(body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionLocationMapping/enable`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disablePromotionLocationMapping(body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionLocationMapping/disable`,
    body
  );
}
