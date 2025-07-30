/**
 * @author: Sehrish Naseer
 * @description: DeptDesignation handling API's management File
 * @datetime : 20-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const DeptDesignationService = {
  listDepartments,
  listSubDepartments,
  listDesignations,
  findDesignationsByDepartment,
  getDepartmentSubdepartments,
  getSubdepartmentofEmployee,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listDepartments(params) {
  return fetchWrapper.get(`${baseUrl}utility/departments`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listSubDepartments(params) {
  return fetchWrapper.get(`${baseUrl}utility/subdepartments`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listDesignations(params) {
  return fetchWrapper.get(`${baseUrl}utility/designations`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function findDesignationsByDepartment(dept) {
  return fetchWrapper.get(`${baseUrl}utility/deptDesignation/${dept}`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getDepartmentSubdepartments(dept) {
  return fetchWrapper.get(`${baseUrl}utility/deptSubDept/${dept}`);
}

function getSubdepartmentofEmployee(empid)
{
  return fetchWrapper.get(`${baseUrl}utility/getEmployeeSubdepartment/${empid}`);
}
