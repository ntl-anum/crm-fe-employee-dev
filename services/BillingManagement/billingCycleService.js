import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const billingCycleService = {
  createBillingCycle,
  getAllBillingCycles,
  getOneBillingCycle,
  deleteBillingCycle,
  disableBillingCycle,
  enableBillingCycle,
  updateBillingCycle,
  getAllServices,
  getPlanByService,
  listEnabledBillingCycle,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or falilure response
 */
function createBillingCycle(params) {
  return fetchWrapper.post(
    `${baseUrl}billing/createBillingCycle`,
    params
  );
}

function getAllBillingCycles() {
  return fetchWrapper.get(`${baseUrl}billing/getAllBillingCycles`);
}

function listEnabledBillingCycle() {
  return fetchWrapper.get(`${baseUrl}billing/listEnabledBillingCycle`);
}

function getOneBillingCycle(id) {
  return fetchWrapper.get(`${baseUrl}billing/getOneBillingCycle/` + id);
}

function deleteBillingCycle(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}billing/deleteBillingCycle/` + id,
    params
  );
}

function disableBillingCycle(id, params) {
  return fetchWrapper.put(
    `${baseUrl}billing/disableBillingCycle/`+ id,
    params
  );
}

function enableBillingCycle(id, params) {
  return fetchWrapper.put(
    `${baseUrl}billing/enableBillingCycle/`+ id,
    params
  );
}

function updateBillingCycle(id, params) {
  return fetchWrapper.put(`${baseUrl}billing/updateBillingCycle/` + id, params);
}

function getAllServices() {
  return fetchWrapper.get(`${baseUrl}bundles/bundlePool/getAllServices`);
}

function getPlanByService(id) {
  return fetchWrapper.get(
    `${baseUrl}bundles/bundlePool/getAllPlanByService/` + id
  );
}
