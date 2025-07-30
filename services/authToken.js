import { fetchWrapper } from "../helpers/fetch_wrapper";

export const authToken = {
  expireToken,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

function expireToken(params) {
  return fetchWrapper.postwithoutHeader(`${baseUrl}auth/expireToken`, params);
}
