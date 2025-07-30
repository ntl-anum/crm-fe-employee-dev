export const NUMBERS_PATTERN = /^[0-9]*$/;
export const WHOLE_NUMBER_PATTERN = /^[0-9]*\.?[0-9]*$/;
export const DECIMAL_PLACES = /^(?![.])^\d*\.?\d*$/;

export const SEQ_NUMBER = /^[0-9]{0,10}$/;
export const NUMBERS_PATTERN_NO_ZERO_AT_START = /^(?!0)[0-9]*$/;
export const NUMBERS_PATTERN_ONE_ZERO_AT_START = /^$|^0?[1-9][0-9]*$|^0$/;
export const PERCENTAGE_PATTERN_NEW = /^(?!0\.)(?!.*\.\d*\.)\d+(\.\d{1,2})?$/;
export const NUMBERS_LETTERS_PATTERN_SPACE = /^[a-zA-Z0-9 ]*$/;
export const NUMBERS_LETTERS_PATTERN = /^[a-zA-Z0-9]*$/;
// export const PLAN_NAME_PATTERN =
//   /^(?![ _-])[a-zA-Z0-9_-]*(?!.* {2})[a-zA-Z0-9 _-]*$/;

export const PLAN_NAME_PATTERN =
  /^(?![ _()-])[a-zA-Z0-9]*(?!.*[ _()-]{2})[a-zA-Z0-9 _()&-]*$/;

  export const ERROR_MESSAGE_PATTERN =
  /^(?![ _().,-])[a-zA-Z0-9]*(?!.*[ _().,-]{2})[a-zA-Z0-9 _().,&-]*$/;

export const REVENUE_HEAD_PATTERN =
  /^(?![ _.&/()%-])[a-zA-Z_-]*(?!.*([ _.&/()%-])\1)[a-zA-Z0-9 _.&/()%-]*$/;

export const DIVISION_CODE_PATTERN = /^([1-9]\d{0,14})?$|^$/;

export const CUSTOMER_PRIORITY_PATTERN =
  // /^(?![ \/()-])[a-zA-Z0-9()/-]*(?!.* {2})[a-zA-Z0-9 ()/-]*$/;
  /^(?![_()/*-])[a-zA-Z0-9()/*\-_]*(?!.* {2})[a-zA-Z0-9 ()/*\-_]*$/;

export const ACCOUNT_ASSIGNMENT_GROUP_PATTERN =
  /^(?!.*[\/\(\)\-_]{2})(?!.* {2})[A-Za-z1-9][A-Za-z0-9\/\(\)\-_ ]{0,48}(?:[A-Za-z0-9][\/\(\)\-_ ]?)*$|^$/;

export const PRODUCT_HIERARCHY_CODE_PATTERN =
  /^(?!.* {2})([0-9]+(?: [0-9]+){0,29})?$/;
export const TAX_NAME_DESCRIPTION_PATTERN =
  /^(?![ _.&*/()-])[a-zA-Z_-]*(?!.* {2})(?!.*[_]{2})(?!.*[-]{2})[a-zA-Z0-9 _.&*/()%-]*$/;

export const ONLY_ALPHABETS_PATTERN =
  /^(?![ _-])[a-zA-Z_-]*(?!.* {2})^(?!.*[-]{2})[a-zA-Z +_-]*$/;
export const BILLING_CYCLE_NAME_PATTERN =
  /^(?![ -])[a-zA-Z-]*(?!.* {2})^(?!.*[-]{2})[a-zA-Z -]*$/;

export const INSTALLMENT_NAME_PATTERN =
  /^(?![ _-])[a-zA-Z0-9()/+&_-]*(?!.* {2})[a-zA-Z0-9() +&_/-]*$/;

// PROMOTION_NAME_DESC_PATTERN changes according to cr-1836
export const PROMOTION_NAME_DESC_PATTERN =
  /^(?![ _./()-])[a-zA-Z_-]*(?!.* {2})(?!.*[_]{2})(?!.*[-]{2})[a-zA-Z0-9 _./()%-]*$/;

export const LETTERS_PATTERN = /^[a-zA-Z]*\s[a-zA-Z]*$/;
export const EMAIL_PATTERN =
  /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export const HOST_PORT_PATTERN =
  /^(?!.*[:]{2})(?!.*[.]{2})(?!.*[/]{3})[a-zA-Z0-9/:.]*$/;

export const MODULE_URL_PATTERN = /^(?!.*[/]{2})[a-zA-Z0-9/]*$/;

export const API_URL_PATTERN =
  /^(?![:_-])(?!.*[/]{2})(?!.*[:]{2})(?!.*[-]{2})(?!.*[_]{2})[a-zA-Z0-9/:_-]*$/;

export const DESCRIPTION_PATTERN_SAP =
  /^(?![ _./()%-])[a-zA-Z_-]*(?!.*([ _./()%-])\1)[a-zA-Z0-9 _./()%-]*$/;

export const PERCENTAGE_PATTERN = /^[0-9]*\.?[0-9]*$/;

// changed the following according to cr-2190
export const DESCRIPTION_PATTERN_SHGL =
  /^(?![ _.&/+(),-])[a-zA-Z_-]*(?!.* {2})(?!.*[_]{2})(?!.*[.]{2})(?!.*[&]{2})(?!.*[/]{2})(?!.*[(]{2})(?!.*[)]{2})(?!.*[+]{2})(?!.*[-]{2})(?!.*[,]{2})[a-zA-Z0-9 _.&/+(),-]*$/;
// /^(?![ _-])[a-zA-Z0-9()_./&-]*(?!.* {2})[a-zA-Z0-9() _./&-]*$/;

// ALPHA_NUMERIC_PATTERN will only allow letters, numbers, hyphen, and underscore
// no other special characters, no two consective spaces, no space at start
export const ALPHA_NUMERIC_PATTERN =
  // /^(?![ _-])[a-zA-Z0-9]*(?!.*([ _-])\1)[a-zA-Z0-9 _-]*$/;
  /^(?![ _-])[a-zA-Z0-9]*(?!.*([ _-])\1)[a-zA-Z0-9_-]*(?![ _-])$/;

// COUNTRY_CITY_PATTERN will only allow letters and spaces
// no special characters, no two consective spaces, no space at start
export const COUNTRY_STATE_CITY_PATTERN =
  // /^(?![ _-])[a-zA-Z_-]*(?!.* {2})(?!.*[_])(?!.*[-])[a-zA-Z ]*$/;
  // /^(?!.*(?:[-_ ]{2}))[a-zA-Z-_ ]*$/;
  /^(?![-_ ])[a-zA-Z](?!.*(?:[-_ ]{2}))[a-zA-Z-_ ]*$|^$/;

export const WAIVER_NAME_PATTERN =
  /^(?![ _/()&-])[a-zA-Z&_-]*(?!.* {2})(?!.*[_]{2})(?!.*[&]{2})(?!.*[-]{2})(?!.*[/]{2})(?!.*[(]{2})(?!.*[)]{2})[a-zA-Z0-9 _/()&-]*$/;

export const BUNDLE_POOL_PATTERN =
  /^(?![ _-])[a-zA-Z0-9_+/-]*(?!.* {2})[a-zA-Z0-9 _+/-]*$/;

// export const INSTALLMENT_NAME_PATTERN =
// /^(?![ _-])[a-zA-Z0-9()/_-]*(?!.* {2})[a-zA-Z0-9() _/-]*$/;
export const ELEMENT_NAME_PATTERN = /^[a-zA-Z][a-zA-Z _/-]*$/;
export const TAX_POOL_PATTERN =
  /^(?![ _.&*/()-])[a-zA-Z_-]*(?!.* {2})(?!.*[_]{2})(?!.*[-]{2})[a-zA-Z0-9 _.&*/()%-]*$/;

export const HARDWARE_NAME_ALIAS_PATTERN =
  /^(?![ .&/()-])[a-zA-Z0-9]*(?!.*([ +,_&/()%-.])\1)[a-zA-Z0-9+,_&/()%-.\s]*$/;
export const ITEM_NAME_ALIAS_PATTERN =
  /^(?![ _.&*/()%-])[a-zA-Z_-]*(?!.*([ _.&*/()%-])\1)[a-zA-Z0-9 _.&*/()%-]*$/;
export const SOI_NAME_PATTERN = 
  /^[^&'/]*$/;
