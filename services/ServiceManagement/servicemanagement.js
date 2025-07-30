/**
 * @author: M Waqas
 * @description: Service Creation Front End
 * @datetime : 11-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const serviceManagement = {
  createservice,
  deleteservice,
  listservices,
  getOneService,
  updateService,
  listService_Prerequisite,
  deleteservicePrerequisite,
  createSerivcePrerequisite,
  getOneServicePreReq,
  updateServicePrerequisite,
  listService_Exclusive,
  deleteserviceExclusive,
  createSerivceExclusive,
  getOneServiceExclusive,
  updateServiceExclusive,
  enableService,
  disableService,
  enableServicePreReq,
  disableServicePreReq,
  enableServiceExclusive,
  disableServiceExclusive,
  listservicelocations,
  createservicelocmapping,
  deleteservicelocmapping,
  getservicelocconfig,
  updateservicelocmapping,
  changerecordstatus,
  listGroupSuffix,
  enableServiceSuffixById,
  disableServiceSuffixById,
  deleteServiceSuffixById,
  createSerivceGroupSuffix,
  getServiceSuffixById,
  updateServiceSuffix,
  listServiceSuffix,
  getTicketData,
  listServiceTicketMapping,
  disableServiceTicketById,
  enableServiceTicektById,
  getAllDeparments,
  createSerivceTicket,
  getServiceTicketById,
  deletetServiceTicketById,
  updateServiceTicketById,
  getServiceTicketByServicePoolId,
  listEnabledServices,
  listEnabledLocDependentServices,
  getServiceAttribute,
  findAllEnabledServiceAttribute,
  getServiceAttributeById,
  createServiceAttribute,
  updateServiceAttribute,
  deleteServiceAttribute,
  enableServiceAttribute,
  disableServiceAttribute,
  createServiceAttributeMapping,
  getServiceAttributeMapping,
  getServiceAttributeMappingById,
  updateServiceAttributeMapping,
  deleteServiceAttributeMapping,
  enableServiceAttributeMapping,
  disableServiceAttributeMapping,
  changerecordstatusenable,
  vasServices,
  listSubAreasBasedOnServicePoolId,
  findAllEnabledServicesForPlanPools,
  getServicesByLocation,
  listAllServiceExclusives,
  listAllServiceDependent,
  findAllEnabledServicesWithPlans,
  getEwServices,
  getDigitalSinageBox,
  getActivationCode,
  getAllServicesBasedOnSubArea,
  getAvailabilitySubAreasOfService,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;
const customerURL = process.env.CUSTOMER_SERVICE_URL;
/**
 * @author: M Waqas
 * @param {*} service_payload
 * @returns success or falilure response
 */
function createservice(params) {
  return fetchWrapper.post(`${baseUrl}services/createservice`, params);
}

function getEwServices(userId) {
  return fetchWrapper.get(`${baseUrl}services/getEwServices/${userId}`);
}

function getDigitalSinageBox(userId) {
  return fetchWrapper.get(`${baseUrl}services/getDigitalSinageBox/${userId}`);
}

function getActivationCode(userId) {
  return fetchWrapper.get(`${baseUrl}services/getActivationCode/${userId}`);
}
/**
 * @author: M Waqas
 * @param {*} -
 * @returns success or falilure response
 */
function listservices() {
  return fetchWrapper.get(`${baseUrl}services/listservices`);
}

function listEnabledServices() {
  return fetchWrapper.get(`${baseUrl}services/listenabledservices`);
}
// function findAllEnabledServicesForPlanPools() {
//   return fetchWrapper.get(
//     `${baseUrl}services/listservices`
//   );
// }

function findAllEnabledServicesForPlanPools() {
  return fetchWrapper.get(
    `${baseUrl}services/findAllEnabledServicesForPlanPools`
  );
}

function listAllServiceExclusives() {
  return fetchWrapper.get(`${baseUrl}services/findAllServiceExclusives`);
}

function listAllServiceDependent() {
  return fetchWrapper.get(`${baseUrl}services/findAllServiceDependent`);
}

function listEnabledLocDependentServices() {
  return fetchWrapper.get(`${baseUrl}services/listenabledLocDependentservices`);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid
 * @returns success or falilure response
 */
function deleteservice(id, operator) {
  return fetchWrapper.delete(
    `${baseUrl}services/deleteservice/${id}`,
    operator
  );
}

/**
 * @author: M Waqas
 * @param {*} serivce_id, subarea_id, payload
 * @returns success or falilure response
 */
function createservicelocmapping(payload) {
  return fetchWrapper.post(
    `${baseUrl}services/createservicelocmapping`,
    payload
  );
}

/**
 * @author: M Waqas
 * @param {*} -
 * @returns success or falilure response
 */
function listservicelocations(params) {
  return fetchWrapper.post(`${baseUrl}services/listservicelocations`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid,payload
 * @returns success or falilure response
 */
function updateServicePrerequisite(id, params) {
  return fetchWrapper.put(`${baseUrl}services/PreReq/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} -
 * @returns success or falilure response
 */
function listService_Exclusive() {
  return fetchWrapper.get(`${baseUrl}services/listserviceExclusive/`);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid
 * @returns success or falilure response
 */
function getOneService(params) {
  return fetchWrapper.get(`${baseUrl}services/service/${params}`);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid,payload
 * @returns success or falilure response
 */
function updateService(id, params) {
  return fetchWrapper.put(`${baseUrl}services/updateService/${id}`, params);
}

/**
 * @author: M Waqas
 * @param {*} servicelocmappingid
 * @returns success or falilure response
 */
function getservicelocconfig(serviceLocMappingId) {
  return fetchWrapper.get(
    `${baseUrl}services/getservicelocconfig/${serviceLocMappingId}`
  );
}

function listSubAreasBasedOnServicePoolId(id) {
  return fetchWrapper.get(
    `${baseUrl}services/listSubAreasBasedOnServicePoolId/${id}`
  );
}
/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid,payload
 * @returns success or falilure response
 */
function updateservicelocmapping(serviceLocMappingId, payload) {
  return fetchWrapper.put(
    `${baseUrl}services/updateservicelocmapping/${serviceLocMappingId}`,
    payload
  );
}

/**
 * @author: M Waqas
 * @param {*} serivceid
 * @returns success or falilure response
 */
function changerecordstatus(serviceLocMappingId, payload) {
  return fetchWrapper.put(
    `${baseUrl}services/changerecordstatus/${serviceLocMappingId}`,
    payload
  );
}
function changerecordstatusenable(serviceLocMappingId, payload) {
  return fetchWrapper.put(
    `${baseUrl}services/changerecordstatusenable/${serviceLocMappingId}`,
    payload
  );
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} servicePreReq_payload
 * @returns success or falilure response
 */
function createSerivceExclusive(params) {
  return fetchWrapper.post(`${baseUrl}services/exclusive/`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid
 * @returns success or falilure response
 */
function getOneServiceExclusive(id) {
  return fetchWrapper.get(`${baseUrl}services/exclusive/${id}`);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid,payload
 * @returns success or falilure response
 */
function updateServiceExclusive(id, params) {
  return fetchWrapper.put(`${baseUrl}services/exclusive/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid,payload
 * @returns success or falilure response
 */
function enableService(id, params) {
  return fetchWrapper.put(`${baseUrl}services/enableService/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid,payload
 * @returns success or falilure response
 */
function disableService(id, params) {
  return fetchWrapper.put(`${baseUrl}services/disableService/${id}`, params);
}

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid
//  * @returns success or falilure response
//  */
//  function enableServicePreReq(id,params)
//  {
//      return fetchWrapper.put(`${baseUrl}services/enablePreReq/${id}`,params);
//  }

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid
 * @returns success or falilure response
 */
function disableServicePreReq(id, params) {
  return fetchWrapper.put(`${baseUrl}services/disablePreReq/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} -
 * @returns success or falilure response
 */
function listService_Prerequisite() {
  return fetchWrapper.get(`${baseUrl}services/listservicePreReq/`);
}

/**
 * @author: M Waqas
 * @param {*} serivceid
 * @returns success or falilure response
 */
function deleteservicePrerequisite(id, params) {
  return fetchWrapper.delete(`${baseUrl}services/PreReq/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} servicePreReq_payload
 * @returns success or falilure response
 */
function createSerivcePrerequisite(params) {
  return fetchWrapper.post(`${baseUrl}services/PreReq/`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid
 * @returns success or falilure response
 */
function getOneServicePreReq(id) {
  return fetchWrapper.get(`${baseUrl}services/PreReq/${id}`);
}

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid,payload
//  * @returns success or falilure response
//  */
// function updateServicePrerequisite(id,params)
// {

//     return fetchWrapper.put(`${baseUrl}services/PreReq/${id}`,params);
// }

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} -
//  * @returns success or falilure response
//  */
// function listService_Exclusive()
// {
//     return fetchWrapper.get(`${baseUrl}services/exclusive`);
// }

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivceid
 * @returns success or falilure response
 */
function deleteserviceExclusive(id, params) {
  return fetchWrapper.delete(`${baseUrl}services/exclusive/${id}`, params);
}

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} servicePreReq_payload
//  * @returns success or falilure response
//  */
// function createSerivceExclusive(params)
// {

//     return fetchWrapper.post(`${baseUrl}services/exclusive`,params);
// }

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid
//  * @returns success or falilure response
//  */
//  function getOneServiceExclusive(id)
//  {
//      return fetchWrapper.get(`${baseUrl}services/exclusive/${id}`);
//  }

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid,payload
//  * @returns success or falilure response
//  */
// function updateServiceExclusive(id,params)
// {
//     return fetchWrapper.put(`${baseUrl}services/exclusive/${id}`,params);
// }

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid,payload
//  * @returns success or falilure response
//  */
//  function enableService(id,params)
//  {
//      return fetchWrapper.put(`${baseUrl}services/enableService/${id}`,params);
//  }

//  /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid,payload
//  * @returns success or falilure response
//  */
//   function disableService(id,params)
//   {
//       return fetchWrapper.put(`${baseUrl}services/disableService/${id}`,params);
//   }

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid
 * @returns success or falilure response
 */
function enableServicePreReq(id, params) {
  return fetchWrapper.put(`${baseUrl}services/enablePreReq/${id}`, params);
}

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid
//  * @returns success or falilure response
//  */
//  function disableServicePreReq(id,params)
//  {
//      return fetchWrapper.put(`${baseUrl}services/disablePreReq/${id}`,params);
//  }

//  /**
//  * @author: M Waqas
//  * @param {*} serivce_id, subarea_id, payload
//  * @returns success or falilure response
//  */
//   function createservicelocmapping(payload)
//   {
//       return fetchWrapper.post(`${baseUrl}services/createservicelocmapping`,payload);
//   }

// /**
//  * @author: M Waqas
//  * @param {*} -
//  * @returns success or falilure response
//  */
//  function listservicelocations() {
//     return fetchWrapper.get(`${baseUrl}services/listservicelocations`);
// }

/**
 * @author: M Waqas
 * @param {*} serivceid
 * @returns success or falilure response
 */
function deleteservicelocmapping(serviceLocMappingId, payLoad) {
  return fetchWrapper.delete(
    `${baseUrl}services/deleteservicelocmapping/${serviceLocMappingId}`,
    payLoad
  );
}

//  /**
//  * @author: M Waqas
//  * @param {*} servicelocmappingid
//  * @returns success or falilure response
//  */
//   function getservicelocconfig(serviceLocMappingId)
//   {
//       return fetchWrapper.get(`${baseUrl}services/getservicelocconfig/${serviceLocMappingId}`);
//   }

//   /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivceid,payload
//  * @returns success or falilure response
//  */
//  function updateservicelocmapping(serviceLocMappingId,payload)
//  {
//      return fetchWrapper.put(`${baseUrl}services/updateservicelocmapping/${serviceLocMappingId}`,payload);
//  }

//  /**
//  * @author: M Waqas
//  * @param {*} serivceid
//  * @returns success or falilure response
//  */
//   function changerecordstatus(serviceLocMappingId,payload)
//   {
//       return fetchWrapper.put(`${baseUrl}services/changerecordstatus/${serviceLocMappingId}`,payload);
//   }

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid
 * @returns success or falilure response
 */
function disableServiceExclusive(id, params) {
  return fetchWrapper.put(`${baseUrl}services/disableExclusive/${id}`, params);
}

/**
 * @author: Sheheryar Ahmed
 * @param {*} serivcePreReqid
 * @returns success or falilure response
 */
function enableServiceExclusive(id, params) {
  return fetchWrapper.put(`${baseUrl}services/enableExclusive/${id}`, params);
}

// /**
//  * @author: Sheheryar Ahmed
//  * @param {*} serivcePreReqid
//  * @returns success or falilure response
//  */
//  function disableServiceExclusive(id,params)
//  {
//      return fetchWrapper.put(`${baseUrl}services/disableExclusive/${id}`,params);
//  }

function listGroupSuffix() {
  return fetchWrapper.get(`${baseUrl}services/allServiceSuffix`);
}
function listServiceSuffix() {
  return fetchWrapper.get(`${baseUrl}services/allServiceListForSuffix`);
}

function enableServiceSuffixById(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/enableServiceSuffix/${id}`,
    params
  );
}
function disableServiceSuffixById(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/disableServiceSuffix/${id}`,
    params
  );
}
function deleteServiceSuffixById(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}services/deleteServiceSuffix/${id}`,
    params
  );
}
function createSerivceGroupSuffix(params) {
  return fetchWrapper.post(
    `${baseUrl}services/createServiceGroupSuffix`,
    params
  );
}
function getServiceSuffixById(id) {
  return fetchWrapper.get(`${baseUrl}services/groupSuffix/${id}`);
}
function updateServiceSuffix(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/updateServiceSuffix/${id}`,
    params
  );
}

// HAMZA TARIQ ////////
///  API's of Service Ticket Mapping//////
/// (5-December-2022)///////////

function getTicketData() {
  return fetchWrapper.get(`${baseUrl}services/listTicketPool`);
}
function listServiceTicketMapping() {
  return fetchWrapper.get(`${baseUrl}services/service_ticket_mapping`);
}
function enableServiceTicektById(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/enableService_ticket_mapping/${id}`,
    params
  );
}
function disableServiceTicketById(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/disableService_ticket_mapping/${id}`,
    params
  );
}
function getAllDeparments() {
  return fetchWrapper.get(`${baseUrl}utility/getAllDepartments`);
}
function createSerivceTicket(params) {
  return fetchWrapper.post(
    `${baseUrl}services/createServiceTicketMapping`,
    params
  );
}
function getServiceTicketById(id) {
  return fetchWrapper.get(`${baseUrl}services/service_ticket_mapping/${id}`);
}
function deletetServiceTicketById(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}services/deleteService_ticket_mapping/${id}`,
    params
  );
}
function updateServiceTicketById(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/updateService_ticket_mapping/${id}`,
    params
  );
}
function getServiceTicketByServicePoolId(id) {
  return fetchWrapper.get(
    `${baseUrl}services/findServiceTicketByServicePoolId/${id}`
  );
}
//API-FOR-SERVICE-ATTRIBUTE
function getServiceAttribute() {
  return fetchWrapper.get(`${baseUrl}services/getServiceAttribute`);
}

function findAllEnabledServiceAttribute() {
  return fetchWrapper.get(`${baseUrl}services/findAllEnabledServiceAttribute
  `);
}
function getServiceAttributeById(id) {
  return fetchWrapper.get(`${baseUrl}services/getServiceAttribute/${id}`);
}
function createServiceAttribute(params) {
  return fetchWrapper.post(`${baseUrl}services/createServiceAttribute`, params);
}
function updateServiceAttribute(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/updateServiceAttribute/${id}`,
    params
  );
}
function deleteServiceAttribute(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}services/deleteServiceAttribute/${id}`,
    params
  );
}
function enableServiceAttribute(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/enableServiceAttribute/${id}`,
    params
  );
}
function disableServiceAttribute(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/disableServiceAttribute/${id}`,
    params
  );
}

function createServiceAttributeMapping(params) {
  return fetchWrapper.post(
    `${baseUrl}services/createServiceAttributeMapping`,
    params
  );
}
function getServiceAttributeMapping() {
  return fetchWrapper.get(`${baseUrl}services/getServiceAttributeMapping`);
}
function getServiceAttributeMappingById(id) {
  return fetchWrapper.get(
    `${baseUrl}services/getServiceAttributeMapping/${id}`
  );
}
function updateServiceAttributeMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/updateServiceAttributeMapping/${id}`,
    params
  );
}
function deleteServiceAttributeMapping(id, params) {
  return fetchWrapper.delete(
    `${baseUrl}services/deleteServiceAttributeMapping/${id}`,
    params
  );
}
function enableServiceAttributeMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/enableServiceAttributeMapping/${id}`,
    params
  );
}
function disableServiceAttributeMapping(id, params) {
  return fetchWrapper.put(
    `${baseUrl}services/disableServiceAttributeMapping/${id}`,
    params
  );
}
function vasServices() {
  return fetchWrapper.get(`${baseUrl}services/vasServices`);
}

function findAllEnabledServicesWithPlans() {
  return fetchWrapper.get(`${baseUrl}services/findAllEnabledServicesWithPlans`);
}

function getServicesByLocation(param) {
  return fetchWrapper.post(`${customerURL}customer/servicesByLocation`, param);
}

function getAllServicesBasedOnSubArea(payLoad) {
  return fetchWrapper.post(`${baseUrl}services/servicesBySubArea`, payLoad);
}

function getAvailabilitySubAreasOfService(serviceId) {
  return fetchWrapper.get(
    `${baseUrl}services/availabilitySubAreasOfService/${serviceId}`
  );
}
