/**
 * @author: Sehrish Naseer
 * @description: MaterialCostSAP API's management File
 * @datetime : 27-OCT-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const MaterialCostSAPService = {
  getAllMaterialGroups,
  getOneMaterialGroupWithDescription,
  getOneMaterialDescription,
  findOneMaterialDescGroup,
  findHardwareGroupByMaterialNumber,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllMaterialGroups(params) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/materialCostSAP/materialGroup`,
    params
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneMaterialGroupWithDescription(body) {
  return fetchWrapper.post(
    `${baseUrl}hardwareConfig/materialCostSAP/materialGroup/one`,
    body
  );
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getOneMaterialDescription(materialDesc) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/materialCostSAP/materialGroup/${materialDesc}`
  );
}
function findOneMaterialDescGroup(id) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/materialCostSAP/findOneMaterialDescGroup/${id}`
  );
}
function findHardwareGroupByMaterialNumber(materialNumber) {
  return fetchWrapper.get(
    `${baseUrl}hardwareConfig/materialCostSAP/findHardwareGroupByMaterialNumber/${materialNumber}`
  );
}
