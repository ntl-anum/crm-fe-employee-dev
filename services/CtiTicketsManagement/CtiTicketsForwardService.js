import { fetchWrapper } from "@/helpers/fetch_wrapper";

export const CtiTicketsForwardService = {
  createCtiTicketsForwardDetails,
};
const baseUrl = process.env.CONFIG_SERVICES_URL;

function createCtiTicketsForwardDetails(payLoad) {
  return fetchWrapper.post(
    `${baseUrl}cti-tickets/createCtiTicketsForwardDetails`,
    payLoad
  );
}
