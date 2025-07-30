import { fetchWrapper } from "@/helpers/fetch_wrapper";
const configUrl = process.env.CONFIG_SERVICES_URL;
export const serviceHardwareMapping = {
  getHardwareDependentServices,
  getAllServiceHardwareMappings,
  createServiceHardwareMapping,
  updateServiceHardwareMapping,
  disableServiceHardwareMapping,
  enableServiceHardwareMapping,
  deleteServiceHardwareMapping,
};

function getHardwareDependentServices() {
  return fetchWrapper.get(`${configUrl}services/hardwareDependentServices`);
}
function getAllServiceHardwareMappings() {
  return fetchWrapper.get(`${configUrl}services/allServiceHardwareMappings`);
}
function createServiceHardwareMapping(payLoad) {
  return fetchWrapper.post(
    `${configUrl}services/serviceHardwareMapping`,
    payLoad
  );
}
function updateServiceHardwareMapping(serviceHardwareMappingId, payLoad) {
  return fetchWrapper.put(
    `${configUrl}services/serviceHardwareMapping/${serviceHardwareMappingId}`,
    payLoad
  );
}
function disableServiceHardwareMapping(serviceHardwareMappingId, payLoad) {
  return fetchWrapper.put(
    `${configUrl}services/disableServiceHardwareMapping/${serviceHardwareMappingId}`,
    payLoad
  );
}
function enableServiceHardwareMapping(serviceHardwareMappingId, payLoad) {
  return fetchWrapper.put(
    `${configUrl}services/enableServiceHardwareMapping/${serviceHardwareMappingId}`,
    payLoad
  );
}

function deleteServiceHardwareMapping(serviceHardwareMappingId, payLoad) {
  return fetchWrapper.delete(
    `${configUrl}services/serviceHardwareMapping/${serviceHardwareMappingId}`,
    payLoad
  );
}
