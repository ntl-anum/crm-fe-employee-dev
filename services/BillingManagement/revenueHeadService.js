import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const revenueHeadService = {
  listRevenueheads,
  createRevenueHead,
  updateRevenueHead,
  getOneRevenueHead,
  deleteRevenueHead,
  enableRevenueHead,
  disableRevenueHead,
  listRevenueheadForService
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */



function listRevenueheads() {
  return fetchWrapper.get(`${baseUrl}billing/revenuehead`);
}

function listRevenueheadForService() {
  return fetchWrapper.get(`${baseUrl}billing/listRevenueheadForService`);
}

function createRevenueHead(params) {
  return fetchWrapper.post(`${baseUrl}billing/revenuehead`, params);
}

function updateRevenueHead(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/updaterevenuehead/` + id, params);
}
function getOneRevenueHead(id) {
  return fetchWrapper.get(`${baseUrl}billing/revenuehead/` + id);
}
function deleteRevenueHead(id, params) {
  return fetchWrapper.delete(`${baseUrl}billing/revenuehead/` + id, params);
}

function enableRevenueHead(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/revenuehead/enable/` + id, params);
}

function disableRevenueHead(id, params) {
  return fetchWrapper.put(
    `${baseUrl}billing/revenuehead/disable/` + id,
    params
  );
}
