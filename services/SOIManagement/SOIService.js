/**
 * @author: Aashar Mehmood
 * @description: SOI API's management File
 * @datetime : 21-Feb-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SOIService = {
  findAllSOI,
  findAllActiveSOI,
  createSOI,
  updateSOI,
  enableSOI,
  disableSOI,
  deleteSOI,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

function findAllSOI() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllSOI`);
}
function findAllActiveSOI() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllActiveSOI`);
}

function createSOI(payLoad) {
  return fetchWrapper.post(`${baseUrl}sourceOfInformation/createSOI`, payLoad);
}

function updateSOI(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/updateSOI/${id}`,
    payLoad
  );
}

function enableSOI(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/enableSOI/${id}`,
    payLoad
  );
}

function disableSOI(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/disableSOI/${id}`,
    payLoad
  );
}

function deleteSOI(id, payLoad) {
  return fetchWrapper.delete(
    `${baseUrl}sourceOfInformation/deleteSOI/${id}`,
    payLoad
  );
}
