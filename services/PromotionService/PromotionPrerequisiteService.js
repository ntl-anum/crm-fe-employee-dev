/**
 * @author: Sehrish Naseer
 * @description: PromotionPrerequisite handling API's management File
 * @datetime : 29-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const PromotionPrerequisiteService = {
  createPromotionPrerequisite,
  updatePromotionPrerequisite,
  deletePromotionPrerequisite,
  enablePromotionPrerequisite,
  disablePromotionPrerequisite,
  getAllPromotionPrerequisites,
  getAllPromotionPrerequisiteDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createPromotionPrerequisite(params) {
  return fetchWrapper.post(`${baseUrl}promotion/promotionPrerequisite`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllPromotionPrerequisites(params) {
  return fetchWrapper.get(`${baseUrl}promotion/promotionPrerequisite`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllPromotionPrerequisiteDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}promotion/promotionPrerequisiteDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updatePromotionPrerequisite(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionPrerequisite/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deletePromotionPrerequisite(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}promotion/promotionPrerequisite/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enablePromotionPrerequisite(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionPrerequisite/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disablePromotionPrerequisite(id, body) {
  return fetchWrapper.put(
    `${baseUrl}promotion/promotionPrerequisite/disable/${id}`,
    body
  );
}
