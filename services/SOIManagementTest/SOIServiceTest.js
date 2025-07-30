/**
 * @author: Aashar Mehmood
 * @description: SOI API's management File
 * @datetime : 21-Feb-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SOIServiceTest = {
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
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllSOITest`);
}
function findAllActiveSOI() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllActiveSOITest`);
}

function createSOI(payLoad) {
  return fetchWrapper.post(`${baseUrl}sourceOfInformation/createSOITest`, payLoad);
}

function updateSOI(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/updateSOITest/${id}`,
    payLoad
  );
}

function enableSOI(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/enableSOITest/${id}`,
    payLoad
  );
}

function disableSOI(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/disableSOITest/${id}`,
    payLoad
  );
}

function deleteSOI(id, payLoad) {
  return fetchWrapper.delete(
    `${baseUrl}sourceOfInformation/deleteSOITest/${id}`,
    payLoad
  );
}
