/**
 * @author: Sehrish Naseer
 * @description: Promotion Pool handling API's management File
 * @datetime : 24-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const PromotionPoolService = {
  createPromotionPool,
  updatePromotionPool,
  deletePromotionPool,
  enablePromotionPool,
  disablePromotionPool,
  listPromotionPools,
  onePromotionPool,
  getLocationInDependentPromos,
  getPromoDetail,
  getAllActivePromotions,
  getInstallationType
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createPromotionPool(params) {
  return fetchWrapper.post(`${baseUrl}promotion/promotionPool`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listPromotionPools(params) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionPool`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function onePromotionPool(id) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionPool/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updatePromotionPool(id, body) {
  return fetchWrapper.put(`${baseUrl}promotion/promotionPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deletePromotionPool(id, body) {
  return fetchWrapper.delete(`${baseUrl}promotion/promotionPool/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enablePromotionPool(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionPool/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disablePromotionPool(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionPool/disable/${id}`,
    body
  );
}

/**
 * @param {*} -
 * @returns success or falilure response
 */
function getLocationInDependentPromos() {
  return fetchWrapper.get(
    `${baseUrl}promotion/promotionPool/locIndependentPromos/price`
  );
}

/**
 * @param {id} -
 * @returns success or falilure response
 */
function getPromoDetail(id,body) {
  return fetchWrapper.post(`${baseUrl}promotion/promotionPool/detail/${id}`,body);
}

function getAllActivePromotions() {
  return fetchWrapper.get(
    `${baseUrl}promotion/listAllActivePromotionPool`
  );
}
function getInstallationType() {
  return fetchWrapper.get(
    `${baseUrl}promotion/getInstallationType`
  );
}
