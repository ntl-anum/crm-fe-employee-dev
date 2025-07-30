/**
 * This file contains routes related to Authentication Module
 */
import { BACKEND_ROUTES } from "../helpers/backend_routes";
import { fetchWrapper } from "../helpers/fetch_wrapper";

export const AuthService = {
  expireToken,
  getToken,
  sendVerificationCode,
  verifyCode,
  logoutUser
};

const baseUrl = process.env.CONFIG_SERVICES_URL;
const authURL= process.env.AUTH_SERVICE_URL;

/**
 * This function returns JWT Token on user login
 * @param {*} params
 * @returns
 */
function getToken(params) {
  return fetchWrapper.postWithoutHeader(
    `${baseUrl}${BACKEND_ROUTES.AUTH.LOGIN}`,
    params
  );
} // end of getToken

/**
 * This function expires JWT Token at DB
 * @param {*} params
 * @returns
 */
function expireToken(params) {
  return fetchWrapper.post(
    `${baseUrl}${BACKEND_ROUTES.AUTH.EXPIRE_TOKEN}`,
    params
  );
} // end of expireToken

/**
 * This function expires JWT Token at DB
 * @param {*} params
 * @returns
 */
function sendVerificationCode(params) {
  return fetchWrapper.postWithoutHeader(
    `${baseUrl}${BACKEND_ROUTES.AUTH.SEND_VERIFY_ROUTE}`,
    params
  );
} // end of expireToken

/**
 * This function expires JWT Token at DB
 * @param {*} params
 * @returns
 */
function verifyCode(params) {
  return fetchWrapper.postWithoutHeader(
    `${baseUrl}${BACKEND_ROUTES.AUTH.VERIFY_ROUTE}`,
    params
  );
}


/**
 * This function expires JWT Token at DB
 * @param {*} params
 * @returns
 */
function logoutUser(params) {
  return fetchWrapper.get(
    `${authURL}${BACKEND_ROUTES.AUTH.LOGOUT_USER}`,
    params
  );
}