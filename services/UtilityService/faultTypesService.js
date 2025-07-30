/**
 * @author: Mursleen Amjad
 * @description: Fault Types related queries from backend
 * @datetime : 26-SEP-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const faultTypesService = {
  getAllFaultTypes,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

function getAllFaultTypes() {
  return fetchWrapper.get(`${baseUrl}utility/getAllFaultTypes`);
}
