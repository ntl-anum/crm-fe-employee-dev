import CryptoJS from 'crypto-js';

const secretKey = process.env.ENCRYPTION_KEY; // Ensure this matches the key used on the server

export const encryptRequest = (data) => {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  };

export const decryptResponse = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export class EncryptedResponse {
  constructor(response) {
    this.response = response;
  }

  async json() {
    const text = await this.response.text();
    const jsonResponse = JSON.parse(text);
   
    return decryptResponse(jsonResponse.encryptedData);
  }

  get status() {
    return this.response.status;
  }

  get ok() {
    return this.response.ok;
  }

}
