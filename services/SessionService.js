/**
 * @desc This file contains functions related to SessionService
 */
import { fetchWrapper } from "../helpers/fetch_wrapper";

export const SessionService = {
  checkSession,
};

const configService=process.env.AUTH_SERVICE_URL;
const billingURL=process.env.BILLING_SERVICE_URL;

// function checkSession(req) {
//   return fetchWrapper.post(`${baseUrl}checkSession`, req);
// }

function checkSession() {
  return fetchWrapper.get(`${configService}auth/validateCustomer` );
}

// function isTokenValid (req) {
//   return fetchWrapper.get_SSR(`${baseUrl}professionalInfo`, req);
// }
