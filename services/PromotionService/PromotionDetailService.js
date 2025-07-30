/**
 * @author: Sehrish Naseer
 * @description: Promotion Detail handling API's management File
 * @datetime : 24-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const PromotionDetailService = {
  createPromotionDetail,
  updatePromotionDetail,
  deletePromotionDetail,
  enablePromotionDetail,
  disablePromotionDetail,
  listPromotionDetails,
  listPromotionDetailDetails,
  getReferenceBasedOnType,
  getPotPayBackOffer,
  getRadReplyData,
  promoIsAssignedToCustomer,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createPromotionDetail(params) {
  return fetchWrapper.post(`${baseUrl}promotion/promotionDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listPromotionDetails(params) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionDetail`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listPromotionDetailDetails(params) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updatePromotionDetail(id, body) {
  return fetchWrapper.put(`${baseUrl}promotion/promotionDetail/${id}`, body);
}

function getPotPayBackOffer(id) {
  return fetchWrapper.get(`${baseUrl}promotion/getPotPayBackOffer/${id}`);
}

function getRadReplyData(id) {
  return fetchWrapper.get(`${baseUrl}promotion/getRadReplyData/${id}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deletePromotionDetail(id, body) {
  return fetchWrapper.delete(`${baseUrl}promotion/promotionDetail/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enablePromotionDetail(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionDetail/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disablePromotionDetail(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionDetail/disable/${id}`,
    body
  );
}
/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getReferenceBasedOnType(type) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionDetail/type/${type}`);
}

function promoIsAssignedToCustomer(promotionPoolId) {
  return fetchWrapper.get(
    `${baseUrl}promotion/promoIsAssignedToCustomer/${promotionPoolId}`
  );
}
