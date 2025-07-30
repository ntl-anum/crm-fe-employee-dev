/**
 * @author: Sehrish Naseer
 * @description: HardwareMaterialGroupSAP handling API's management File
 * @datetime : 27-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const HardwareMaterialGroupSAPService = {
  createHardwareMaterialGroupSAP,
  updateHardwareMaterialGroupSAP,
  deleteHardwareMaterialGroupSAP,
  enableHardwareMaterialGroupSAP,
  disableHardwareMaterialGroupSAP,
  getAllHardwareMaterialGroupSAP,
  getOneHardwareMaterialGroupSAP,
  getAllActiveHardwareMaterialGroupSAP,
  getDataOfhardwareDetail,
  getDataOfhardwareConsumables,
  getTechnicalRecommendations,
  getAllHardwareMaterialDescSAPByHardwareGroup,
  findHardwaresWithGroup,
  getAllActiveHardwareMaterialGroup
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createHardwareMaterialGroupSAP(params) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP`,
    params
  );
}

function getTechnicalRecommendations(userId) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/getTechnicalRecommendations/${userId}`
  );
}

function getDataOfhardwareDetail(userId) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/getDataOfhardwareDetail/${userId}`
  );
}

function getDataOfhardwareConsumables(userId) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/getDataOfhardwareConsumables/${userId}`
  );
}


function findHardwaresWithGroup(body) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/findHardwaresWithGroup`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllHardwareMaterialGroupSAP(params) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP`,
    params
  );
}
function getAllActiveHardwareMaterialGroupSAP(params) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/activeHardwareMaterialGroupSAP`,
    params
  );
}

function getAllActiveHardwareMaterialGroup(params) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/activeHardwareMaterialGroup`,
    params
  );
}



/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneHardwareMaterialGroupSAP(id) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP/${id}`
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateHardwareMaterialGroupSAP(id, body) {
  return fetchWrapper.put(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteHardwareMaterialGroupSAP(id, body) {
  return fetchWrapper.delete(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableHardwareMaterialGroupSAP(id, body) {
  return fetchWrapper.put(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP/enable/${id}`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableHardwareMaterialGroupSAP(id, body) {
  return fetchWrapper.put(
    `${baseUrl}hardwareConfig/hardwareMaterialGroupSAP/disable/${id}`,
    body
  );
}

function getAllHardwareMaterialDescSAPByHardwareGroup(params) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/hardwareMaterialDescSAP/hardwareByHardwareType`,
    params
  );
}
