/**
 * @author: Sehrish Naseer
 * @description: PromotionExclusive handling API's management File
 * @datetime : 29-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const PromotionExclusiveService = {
  createPromotionExclusive,
  updatePromotionExclusive,
  deletePromotionExclusive,
  enablePromotionExclusive,
  disablePromotionExclusive,
  getAllPromotionExclusives,
  getAllPromotionExclusiveDetails,
  onePromotionExclusive
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createPromotionExclusive(params) {
  return fetchWrapper.post(`${baseUrl}promotion/promotionExclusive`, params);
}


function onePromotionExclusive(id) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionExclusive/${id}`);
}
/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllPromotionExclusives(params) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionExclusive`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllPromotionExclusiveDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}promotion/promotionExclusiveDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updatePromotionExclusive(id, body) {
  return fetchWrapper.put(`${baseUrl}promotion/promotionExclusive/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deletePromotionExclusive(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}promotion/promotionExclusive/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enablePromotionExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionExclusive/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disablePromotionExclusive(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionExclusive/disable/${id}`,
    body
  );
}
