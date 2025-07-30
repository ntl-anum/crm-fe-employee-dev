/**
 * @author: Mursleen Amjad
 * @description: Department related queries from backend
 * @datetime : 27-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const departmentService = {
  getAllDepartmentsWithEmails,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

function getAllDepartmentsWithEmails() {
  return fetchWrapper.get(`${baseUrl}utility/getAllDepartmentsWithEmails`);
}
