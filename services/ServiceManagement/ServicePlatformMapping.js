/**
 * @author: M Waqas
 * @description: Service Creation Front End
 * @datetime : 11-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const servicePlatformMappingService = {
  findAllPlatforms,
  saveServicePlatformMapping,
  getActiveServicePlatform,
  enableServicePlatformMapping,
  disableServicePlatformMapping,
  deleteServicePlatformMapping,
  updateServicePlatformMapping
};

const baseUrl = process.env.CONFIG_SERVICES_URL;
const customerURL = process.env.CUSTOMER_SERVICE_URL;

function findAllPlatforms() {
  return fetchWrapper.get(`${baseUrl}services/findAllPlatforms`);
}

function saveServicePlatformMapping(params) {
  return fetchWrapper.post(
    `${baseUrl}services/saveServicePlatformMapping`,
    params
  );
}

function getActiveServicePlatform() {
  return fetchWrapper.get(`${baseUrl}services/getActiveServicePlatform`);
}

function deleteServicePlatformMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/deleteServicePlatformMapping/${id}`,
    body
  );
}

function disableServicePlatformMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/disableServicePlatformMapping/${id}`,
    body
  );
}

function enableServicePlatformMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/enableServicePlatformMapping/${id}`,
    body
  );
}


function updateServicePlatformMapping(id, body) {
  return fetchWrapper.put(
    `${baseUrl}services/updateServicePlatformMapping/${id}`,
    body
  );
}