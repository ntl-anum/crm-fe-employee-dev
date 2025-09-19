/**
 * @author: Anum Rafaqat
 * @description: Compliance Management Service API
 * @datetime : 18-NOV-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ComplianceService = {
  CreateSOPDocument,
  CreateHistory,
  CreateEscalations,
  CreateRoles,
  CreateClauses,
  listComplianceByDept,
  getHistoryById,
  getEscalationById,
  getRolesById,
  getClausesById,
  getSOPDataById,
  getSOPDetailById,
  UpdateHistory,
  UpdateRoles,
  UpdateEscalations,
  UpdateClauses,
  UpdateSOPDocument,
  listArchivedSOPs,
  addDocDetails,
  getAnnexureById,
  UpdateAnnexure,
  getProcessImages,
  deletefile,
  deleteAnnexureFiles,
  UpdateSOP,
  deleteSOPByName,
  checkSOPByName

};
const baseUrl = process.env.CONFIG_SERVICES_URL;
const ftpURL = process.env.FTP_SERVICE_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function CreateSOPDocument(params) {
     console.log("parameter being sent now:  ",params);
  return fetchWrapper.post(`${baseUrl}document/CreateSOP`, params);
}

// Create History (can accept array or single object)
function CreateHistory(params) {
  console.log("parameter being sent now (History): ", params);
  return fetchWrapper.post(`${baseUrl}document/AddHistory`, params);
}

// Create Escalations
function CreateEscalations(params) {
  console.log("parameter being sent now (Escalations): ", params);
  return fetchWrapper.post(`${baseUrl}document/AddEscalationMatrix`, params);
}

// Create Roles
function CreateRoles(params) {
  console.log("parameter being sent now (Roles): ", params);
  return fetchWrapper.post(`${baseUrl}document/AddRolesResponsibility`, params);
}

// Create Clauses
function CreateClauses(params) {
  console.log("parameter being sent now (Clauses): ", params);
  return fetchWrapper.post(`${baseUrl}document/AddClauses`, params);
}

function listComplianceByDept(dept,subdept) {
  console.log("parameter being sent now for report: ", dept,subdept);
   return fetchWrapper.get(`${baseUrl}document/listSOPByDept/${dept}/${subdept}`);
}


// Fetch SOP Data
function getSOPDataById(id) {
  console.log("Fetching SOP Data for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getSOPDataById/${id}`);
}

// Fetch SOP Detail
function getSOPDetailById(id) {
  console.log("Fetching SOP Detail for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/detail/getSOPDetailById/${id}`);
}

// Fetch Clauses
function getClausesById(id) {
  console.log("Fetching Clauses for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getClausesById/${id}`);
}

// Fetch Roles
function getRolesById(id) {
  console.log("Fetching Roles for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getRolesById/${id}`);
}

// Fetch Escalation
function getEscalationById(id) {
  console.log("Fetching Escalation for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getEscalationById/${id}`);
}

// Fetch History
function getHistoryById(id) {
  console.log("Fetching History for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getHistoryById/${id}`);
}

// 📌 Update History
function UpdateHistory(documentId, data) {
  console.log("Updating History for Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/update-history`, data);
}

// 📌 Update Escalations
function UpdateEscalations(documentId, data) {
  console.log("Updating Escalations for Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/update-escalation`, data);
}

// 📌 Update Roles
function UpdateRoles(documentId, data) {
  console.log("Updating Roles for Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/update-roles`, data);
}

// 📌 Update Clauses
function UpdateClauses(documentId, data) {
  console.log("Updating Clauses for Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/update-clauses`, data);
}

//function will archive previous document row and create new one
function UpdateSOPDocument(documentId, data) {
  console.log("Updating SOP Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/update-sop`, data);
}

//function will only update document table row, doesnt create the whole new version
function UpdateSOP(documentId, data) {
  console.log("Updating SOP Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/updateSOPDocument`, data);
}
function listArchivedSOPs(sopName){
 console.log("Fetching Archived SOPs:", sopName);
  return fetchWrapper.get(`${baseUrl}document/${sopName}/getAllArchivedSOP`);
}
function addDocDetails(params) {
     console.log("parameter being sent now:  ",params);
  return fetchWrapper.post(`${baseUrl}document/addDocDetails`, params);
}

// Fetch History
function getAnnexureById(id) {
  console.log("Fetching Annexture for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getAnnexureById/${id}`);
}

function UpdateAnnexure(documentId, data) {
  console.log("Updating SOP Document:", documentId, data);
  return fetchWrapper.put(`${baseUrl}document/${documentId}/update-annexure`, data);
}
// Fetch History
function getProcessImages(id) {
  console.log("Fetching getProcessImages for ID: ", id);
  return fetchWrapper.get(`${baseUrl}document/getProcessImages/${id}`);
}

function deletefile(body) {
  return fetchWrapper.post(`${ftpURL}ftp/deleteFile`, body);
}

function deleteAnnexureFiles(payload) {
  console.log("files that are deleted: ", payload);
  return fetchWrapper.post(`${baseUrl}document/deleteAnnexureFiles`, payload);
}

function deleteSOPByName(sopName){
 console.log("Delete SOP Document:", sopName);
  return fetchWrapper.put(`${baseUrl}document/delete-SOP/${sopName}`);
}

function checkSOPByName(sopName,dept,subDept){
 console.log("Check If already exists sop name:", sopName);
  return fetchWrapper.get(`${baseUrl}document/check-SOPExists/${sopName}/${dept}/${subDept}`);
  
}