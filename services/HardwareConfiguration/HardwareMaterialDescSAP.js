/**
 * @author: Sehrish Naseer
 * @description: HardwareMaterialDescSAP handling API's management File
 * @datetime : 27-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const HardwareMaterialDescSAPService = {
  createHardwareMaterialDescSAP,
  updateHardwareMaterialDescSAP,
  deleteHardwareMaterialDescSAP,
  enableHardwareMaterialDescSAP,
  disableHardwareMaterialDescSAP,
  getAllHardwareMaterialDescSAP,
  getAllHardwareMaterialDescSAPDetails,
  getOneHardwareMaterialDescSAP,
  getAllHardwareMaterialDescSAPByHardwareGroup,
  findIndividualHardwares,
  hardwareByHardwareTypeForBundleDetail,
  hardwareByHardwareTypeForPromoDetail,
  findHardwaresByHardwareID
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createHardwareMaterialDescSAP(params) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllHardwareMaterialDescSAPDetails(params) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAPDetails`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneHardwareMaterialDescSAP(id) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/${id}`
  );
}


function hardwareByHardwareTypeForPromoDetail(id) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/hardwareByHardwareTypeForPromoDetail/${id}`
  );
}



function findHardwaresByHardwareID(hardwareID) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/findHardwaresByHardwareID/${hardwareID}`
  );
}




/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllHardwareMaterialDescSAP(params) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateHardwareMaterialDescSAP(id, body) {
  return fetchWrapper.put(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteHardwareMaterialDescSAP(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableHardwareMaterialDescSAP(id, body) {
  return fetchWrapper.put(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableHardwareMaterialDescSAP(id, body) {
  return fetchWrapper.put(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/disable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllHardwareMaterialDescSAPByHardwareGroup(params) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/hardwareByHardwareType`,
    params
  );
}


function hardwareByHardwareTypeForBundleDetail(params) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/hardwareByHardwareTypeForBundleDetail`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function findIndividualHardwares() {
  return fetchWrapper.get(`${baseUrl}hardwareConfig/findIndividualHardwares`);
}
