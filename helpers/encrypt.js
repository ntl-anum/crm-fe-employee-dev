/**
 * * THis file contains encrypt and decrypt algos to be used through out project for URL param encryption,
 * * Cookie encryption etc
 * * Date 08/09/2023
 */
import CryptoJS from "crypto-js";

export function encryptData(data, encryptionKey) {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
  return replaceSpecialCharacters(encryptedData);
}

export function decryptData(encryptedText, decryptionKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(
    reverseSpecialCharacterReplacements(encryptedText),
    decryptionKey
  );
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return paramStringToObject(decryptedData);
}

function replaceSpecialCharacters(inputString) {
  // return inputString.replace(/[^\w\s]/g, replaceSpecialChars);
  return Buffer.from(inputString).toString("base64");
}

function reverseSpecialCharacterReplacements(inputString) {
  // return inputString.replace(/\_(\d+)\_/g, replaceAsciiCodes);
  return Buffer.from(inputString, "base64").toString("utf-8");
}

// * Convert Query Param String to Object
function paramStringToObject(decryptedString) {
  // Split the string on the '&' character
  const keyValuePairArray = decryptedString.split("&");

  // Create an empty object to store the key-value pairs
  const resultObject = {};

  // Iterate through the key-value pairs and split them on the '=' character
  keyValuePairArray.forEach((pair) => {
    const [key, value] = pair.split("=");

    // Add the key-value pair to the result object
    resultObject[key] = value;
  });
  return resultObject;
}
