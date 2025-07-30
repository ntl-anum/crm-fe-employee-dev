/**
 * @author: Sehrish Naseer
 * @description: ProfessionalInfo handling API's management File
 * @datetime : 20-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const ProfessionalInfoService = {
  listTeams,
  listIndividuals,
  listDepartmentIndividuals,
  listIndividualDepartment,
  professionalListEmployees,
  professionalSalesListEmployees,
  checkEmployee,
  getUserInfo,
  checkManager,
  getSubDepartmentTeams,
  getIndividualsByTeamDesignation,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listTeams(params) {
  return fetchWrapper.get(`${baseUrl}utility/teams`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listIndividuals(params) {
  return fetchWrapper.get(`${baseUrl}utility/individuals`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listDepartmentIndividuals(department) {
  return fetchWrapper.get(`${baseUrl}utility/individualsByDept/${department}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listIndividualDepartment(user) {
  return fetchWrapper.get(`${baseUrl}utility/userInfo/${user}`);
}

function professionalListEmployees() {
  return fetchWrapper.get(`${baseUrl}utility/individuals`);
}
function professionalSalesListEmployees() {
  return fetchWrapper.get(`${baseUrl}utility/salesIndividual`);
}
function checkEmployee(user) {
  return fetchWrapper.get(`${baseUrl}utility/emplyeeExist/${user}`);
}
function getUserInfo(user) {
  return fetchWrapper.get(`${baseUrl}utility/userInfo/${user}`);
}
function checkManager(user) {
  return fetchWrapper.get(`${baseUrl}utility/checkManager/${user}`);
}

function getSubDepartmentTeams(subDept) {
  return fetchWrapper.get(`${baseUrl}utility/teamsBySubDept/${subDept}`);
}

function getIndividualsByTeamDesignation(params) {
  return fetchWrapper.post(`${baseUrl}utility/teamDesigIndividuals`, params);
}
