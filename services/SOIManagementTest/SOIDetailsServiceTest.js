/**
 * @author: Aashar Mehmood
 * @description: SOI API's management File
 * @datetime : 21-Feb-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SOIDetailsServiceTest = {
  findAllSOIDetails,
  findAllActiveSOIDetails,
  createSOIDetails,
  updateSOIDetails,
  enableSOIDetails,
  disableSOIDetails,
  deleteSOIDetails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

function findAllSOIDetails() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllSOIDetailsTest`);
}
function findAllActiveSOIDetails() {
  return fetchWrapper.get(
    `${baseUrl}sourceOfInformation/findAllActiveSOIDetailsTest`
  );
}

function createSOIDetails(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}sourceOfInformation/createSOIDetailsTest`,
    payLoad
  );
}

function updateSOIDetails(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/updateSOIDetailsTest/${id}`,
    payLoad
  );
}

function enableSOIDetails(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/enableSOIDetailsTest/${id}`,
    payLoad
  );
}

function disableSOIDetails(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/disableSOIDetailsTest/${id}`,
    payLoad
  );
}

function deleteSOIDetails(id, payLoad) {
  return fetchWrapper.delete(
    `${baseUrl}sourceOfInformation/deleteSOIDetailsTest/${id}`,
    payLoad
  );
}
