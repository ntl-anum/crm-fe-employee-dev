/**
 * @auth Mahnoor Mustajab
 * @desc This file contains the helper functions (POST,GET,PUT,DELETE).
 * @date 27/07/2022
 */
import Cookie from "js-cookie";
import Router from "next/router";
import { FETCH_WRAP, APP_ROUTES } from "./enums";
import crypto from "crypto";
import { encryptRequest } from "./encryption-utils";

export const fetchWrapper = {
  get,
  post,
  postWithoutHeader,
  put,
  delete: deleteItem,
};

/**
 * Helper Function
 * THis function returns header for a get request
 * @returns
 */
function getGETHeaders() {
  const accessToken = Cookie.get(process.env.TOKEN);
  const username = Cookie.get(process.env.USER);
  return {
    "Content-Type": FETCH_WRAP.GET_CONTENT_TYPE,
    Authorization: FETCH_WRAP.BEARER + accessToken,
    username: username,
  };
} // end of getGETHeaders

function getENCGETHeaders() {
  const accessToken = Cookie.get(process.env.COOKIE_NAME);
  //const username = Cookie.get(process.env.USER);
  return {
    "Content-Type": FETCH_WRAP.GET_CONTENT_TYPE,
    Authorization: FETCH_WRAP.BEARER + accessToken,
    //username: username,
  };
}
/**
 * Helper Function
 * THis function returns header for a post request
 * @returns
 */
function getPOSTHeaders() {
  const accessToken = Cookie.get(process.env.TOKEN);
  const username = Cookie.get(process.env.USER);
  return {
    "Content-Type": FETCH_WRAP.POST_CONTENT_TYPE,
    Authorization: FETCH_WRAP.BEARER + accessToken,
    username: username,
  };
} // end of getPOSTHeaders

/**
 * Mursleen - 14/10/2023
 * Helper Function
 * THis function returns header for a post request
 * @returns
 */
function getEncPOSTHeaders(body) {
  try {
    const accessToken = Cookie.get(process.env.COOKIE_NAME);
    const hmacKey = generateHmacSignature(body);
    // const username = Cookie.get(process.env.USER);
    return {
      "Content-Type": FETCH_WRAP.POST_CONTENT_TYPE,
      Authorization: FETCH_WRAP.BEARER + accessToken,
      "X-Signature": hmacKey,
    };
  } catch (error) {
    console.log(error);
  }
} // end of getEncPOSTHeaders

/**
 * This function is called for get request
 * @param url
 * @returns
 */
async function get(url, signal = null) {
  try {
    areCookiesValid();
    const requestOptions = {
      method: FETCH_WRAP.METHOD.GET,
      headers: getENCGETHeaders(),
      credentials: "include",
      signal: signal,
    };
    const username = Cookie.get(process.env.USER);
    let res = await fetch(url, requestOptions);
    return expireUnauthorizedToken(res);
  } catch (error) {
    console.log("AJAX CALL FAILED for " + url);
  }
} // end of get

// /**
//  * This function is called for get ssr request
//  * @param url
//  * @returns
//  */
// async function get_SSR(url, req) {
//   try {
//     areCookiesValid();
//     const cookies = parseCookies(req);
//     const requestOptions = {
//       method: FETCH_WRAP.METHOD.GET,
//       headers: getGETHeaders(),
//     };
//     let res = fetch(url, requestOptions);
//     return expireUnauthorizedToken(await res, cookies.username, "SSR");
//   } catch (error) {
//     console.log("AJAX CALL FAILED for " + url);
//   }
// }

/**
 * This function is called for post request
 * @param {*} url
 * @param {*} body
 * @returns
 */
async function post(url, body, signal = null) {
  try {
    areCookiesValid();
    const encryptedBody = encryptRequest(body);
    const requestOptions = {
      method: FETCH_WRAP.METHOD.POST,
      credentials: "include",
      headers: getEncPOSTHeaders(body),
      body: JSON.stringify(body),
      signal: signal,
    };

    let res = await fetch(url, requestOptions);

    return expireUnauthorizedToken(res);
  } catch (error) {
    console.log("AJAX CALL FAILED for " + url);
  }
}

// /**
//  * This function is used for post request without any body
//  * @param {*} url
//  * @returns
//  */
// async function postWithoutBody(url) {
//   try {
//     areCookiesValid();
//     const requestOptions = {
//       method: FETCH_WRAP.METHOD.POST,
//       headers: getPOSTHeaders(),
//     };
//     const username = Cookie.get(process.env.USER);
//     let res = await fetch(url, requestOptions);
//     return expireUnauthorizedToken(res, username, "client");
//   } catch (error) {
//     console.log("AJAX CALL FAILED for " + url);
//   }
// } // end of postWithoutBody

/**
 * This function is used for post request without any headers(token)
 * e.g. Login Route
 * @param {*} url
 * @param {*} body
 * @returns
 */
async function postWithoutHeader(url, body) {
  try {
    const requestOptions = {
      method: FETCH_WRAP.METHOD.POST,
      headers: { "Content-Type": FETCH_WRAP.POST_CONTENT_TYPE },
      body: JSON.stringify(body),
    };
    let res = await fetch(url, requestOptions);
    return res;
  } catch (error) {
    console.log("AJAX CALL FAILED for " + url);
  }
} //end of postWithoutHeader

/**
 * This method send request for put method
 * @param {*} url
 * @param {*} body
 * @returns
 */
async function put(url, body, signal = null) {
  try {
    areCookiesValid();
    const encryptedBody = encryptRequest(body);
    const requestOptions = {
      method: FETCH_WRAP.METHOD.PUT,
      headers: getEncPOSTHeaders(body),
      body: JSON.stringify(body),
      credentials: "include",
      signal: signal,
    };
    const username = Cookie.get(process.env.USER);
    const response = await fetch(url, requestOptions);

    return expireUnauthorizedToken(response);
  } catch (error) {
    console.log("AJAX CALL FAILED for " + url);
  }
} // end of put

// prefixed with underscored because delete is a reserved word in javascript
/**
 * This function send delete request
 * @param {*} url
 * @param {*} body
 * @returns
 */
async function deleteItem(url, body, signal) {
  try {
    areCookiesValid();
    const encryptedBody = encryptRequest(body);
    const requestOptions = {
      method: FETCH_WRAP.METHOD.DELETE,
      headers: getEncPOSTHeaders(body),
      body: JSON.stringify(body),
      credentials: "include",
      signal: signal,
    };
    // return await fetch(url, requestOptions);
    const username = Cookie.get(process.env.USER);
    const response = await fetch(url, requestOptions);

    return expireUnauthorizedToken(response);
  } catch (error) {
    console.log("AJAX CALL FAILED for " + url);
  }
}

/**
 * This function will expire token and removes it from cookies
 * @param {*} response
 * @param {*} username
 * @param {*} clientOrServer
 * @returns
 */
async function expireUnauthorizedToken(response) {
  try {
    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status === 409
    ) {
      const errData = await response.json();

      if (errData.statuscode === 409) {
        Router.push(APP_ROUTES.CONFLICT);
      } else if (errData.statuscode === 403) {
        Router.push(APP_ROUTES.FORBIDDEN);
      } else {
        if (errData.statuscode === 401) {
          Router.push(APP_ROUTES.SESSIONEXPIRED);
        } else {
          Router.push(APP_ROUTES.SESSIONEXPIRED);
        }
      }
    } else {
      return response;
    }
  } catch (error) {
    console.log("expireUnauthorizedToken Error");
  }
} // end of expireUnauthorizedToken

/**
 * This function will check if cookies are valid or not before sending any ajax call
 */
function areCookiesValid() {
  //  * Mursleen - 14/10/2023
  return true;
  if (Cookie.get(process.env.COOKIE_NAME)) {
    return true;
  } else {
    return true;
    Router.push(APP_ROUTES.LOGIN);
  }
}

const generateHmacSignature = (payload) => {
  // Stringify the payload in a consistent way
  const payloadString = JSON.stringify(payload);

  // Create HMAC using SHA-256
  return crypto
    .createHmac("sha256", process.env.HMAC_KEY)
    .update(payloadString)
    .digest("hex");
};
