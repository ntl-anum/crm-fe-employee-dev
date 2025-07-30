/**
 * @author: Sehrish Naseer
 * @description: Template Suggestions handling API's management File
 * @datetime : 09-DEC-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const TemplateSuggestionsService = {
  getAllTemplateSuggestions,
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function getAllTemplateSuggestions(params) {
  return fetchWrapper.get(`${baseUrl}templateSuggestions`, params);
}
