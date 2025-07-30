/**
 * @author: Aashar Mehmood
 * @description: SOI API's management File
 * @datetime : 21-Feb-2024
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const SOIDetailsService = {
  findAllSOIDetails,
  findAllActiveSOIDetails,
  createSOIDetails,
  updateSOIDetails,
  enableSOIDetails,
  disableSOIDetails,
  deleteSOIDetails,
  findAllDeletedSOI,
  findAllActiveDeletedSoi
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

function findAllSOIDetails() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllSOIDetails`);
}

function findAllDeletedSOI() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllDeletedSOI`);
}

function findAllActiveDeletedSoi() {
  return fetchWrapper.get(`${baseUrl}sourceOfInformation/findAllActiveDeletedSoi`);
}
function findAllActiveSOIDetails() {
  return fetchWrapper.get(
    `${baseUrl}sourceOfInformation/findAllActiveSOIDetails`
  );
}

function createSOIDetails(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}sourceOfInformation/createSOIDetails`,
    payLoad
  );
}

function updateSOIDetails(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/updateSOIDetails/${id}`,
    payLoad
  );
}

function enableSOIDetails(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/enableSOIDetails/${id}`,
    payLoad
  );
}

function disableSOIDetails(id, payLoad) {
  return fetchWrapper.put(
    `${baseUrl}sourceOfInformation/disableSOIDetails/${id}`,
    payLoad
  );
}

function deleteSOIDetails(id, payLoad) {
  return fetchWrapper.delete(
    `${baseUrl}sourceOfInformation/deleteSOIDetails/${id}`,
    payLoad
  );
}
