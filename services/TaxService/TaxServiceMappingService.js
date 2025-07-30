/**
 * @author: Sehrish Naseer
 * @description: Tax Service Mapping handling API's management File
 * @datetime : 22-AUG-2022
 */

import { fetchWrapper } from "../../helpers/fetch_wrapper";

export const TaxServiceMappingService = {
	createTaxServiceMapping,
	updateTaxServiceMapping,
	deleteTaxServiceMapping,
	enableTaxServiceMapping,
	disableTaxServiceMapping,
	listTaxServiceMappings,
	listTaxServiceMappingDetails,
	enableTaxServiceMappingsList,
	getTaxServiceMappingByID,
	getTaxRateValueBySapCode
};

const baseUrl = process.env.CONFIG_SERVICES_URL;

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function createTaxServiceMapping(params) {
	return fetchWrapper.post(`${baseUrl}taxes/taxServiceMapping`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listTaxServiceMappings(params) {
	return fetchWrapper.get(`${baseUrl}taxes/taxServiceMapping`, params);
}
function enableTaxServiceMappingsList(params) {
	return fetchWrapper.get(`${baseUrl}taxes/enableTaxServiceMappingList`);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function listTaxServiceMappingDetails(params) {
	return fetchWrapper.get(`${baseUrl}taxes/taxServiceMappingDetails`, params);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function updateTaxServiceMapping(id, body) {
	return fetchWrapper.put(`${baseUrl}taxes/taxServiceMapping/${id}`, body);
}
function getTaxRateValueBySapCode(id, body) {
	return fetchWrapper.get(`${baseUrl}taxes/getTaxRateValueBySapCode/${id}`);
}



/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function deleteTaxServiceMapping(id, body) {
	return fetchWrapper.delete(`${baseUrl}taxes/taxServiceMapping/${id}`, body);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function enableTaxServiceMapping(id, body) {
	return fetchWrapper.put(
		`${baseUrl}taxes/taxServiceMapping/enable/${id}`,
		body
	);
}

/**
 *
 * @param {*} params
 * @returns success or failure response
 */
function disableTaxServiceMapping(id, body) {
	return fetchWrapper.put(
		`${baseUrl}taxes/taxServiceMapping/disable/${id}`,
		body
	);
}
function getTaxServiceMappingByID(id) {
	return fetchWrapper.get(
		`${baseUrl}taxes/taxServiceMapping/${id}`
	);
}

