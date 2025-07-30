
import Cookie from "js-cookie";
import { decryptData } from "./encrypt";


/**
 * This function will return expiry time for cookies
 * @returns
 */
export function getExpiryTime() {
  // 7 (days)* 24 (hours)* 60(minutes) * 60(seconds) * 1000(miliseconds)
  var date = new Date();
  date.setTime(date.getTime() + 6 * 60 * 60 * 1000);
  // date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
  return date;
}

export function getOperatorFromCookie(){
  const username = Cookie.get('operator');

  if(username)
  {
    const decryptCookie= decryptData(username,process.env.ENCRYPT_KEY);

    if(decryptCookie && decryptCookie.operator)
    {
      return decryptCookie.operator;
    } else {
      return null;
    }
  }
  else
  {
    return null
  }
  
}

export function getOperatorForReducer(accessToken) {
  const value = decryptXOR(accessToken, process.env.XOR_KEY);

  let [username, sessionId] = value.split("+");

  return username;
}

function decryptXOR(ciphertext, key) {
  ciphertext = atob(ciphertext);
  key = key.repeat(Math.ceil(ciphertext.length / key.length)); // Repeat key to match ciphertext length
  return String.fromCharCode(
    ...ciphertext
      .split("")
      .map((char, i) => char.charCodeAt(0) ^ key.charCodeAt(i))
  );
}
