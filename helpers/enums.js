/**
 * @auth Mursleen Amjad
 * @desc This file will contain all the constants used in the project
 * @date 31/01/2023
 */

export const FETCH_WRAP = {
  METHOD: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  GET_CONTENT_TYPE: "application/x-www-form-urlencoded",
  POST_CONTENT_TYPE: "application/json",
  BEARER: "Bearer ",
};

export const APP = {
  TITLE: "Nayatel CRM",
  DESC: "This is default description",
  KEYWORDS: "this is default keywords",
  AUTHOR: "Enterprise Solution",
};

export const APP_ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  NOT_FOUND: "/400",
  SERVER_ERROR: "/500",
  FORBIDDEN: "/403",
  CONFLICT: "/409",
  UNAUTHORIZED: "/401",
  SESSIONEXPIRED:"/sessionExpire",
  CRMDEV_LOGIN:"https://crmstg.nayatel.com/nhrms/LoginController_Mursleen/"
};

export const RESPONSE_STATUS = {
  SUCCESS: "SUCCESS",
};

export const STORAGE_IMAGES = {
  STORAGE_CRM_REVAMPING_IMAGES_URL:
    'https://storage.nayatel.com/views/crmViews/storage/CRM_Revamping_Images/',
  SEARCH_ICON: 'searchIcon.svg',
  PROFILE_IMAGE: 'Profile.jpeg',
  NEW_DASHBOARD: 'newNavDashboard.svg',
  DASHBOARD: 'Dashboard.svg',
  CRM_ICON: 'newNavCRM.svg',
  HRM_ICON: 'newNavHRM.svg',
  AUTHORIZE_ICON: 'newNavAuthorize.svg',
  FTTH_ICON: 'newNavFTTH.svg',
  MENU_ICON: 'newNavMenuIcon.svg',
  BELL_ICON: 'newNavBellIcon.svg',
  FAV_ICON: 'newNavFavIcon.svg',
  NAYATEL_LOGO: 'NayatelLogo.svg',
  HARDWARE: 'Hardware.svg',
  PHONE_ALLOCATION: 'PhoneAllocation.svg',
  INSTALLMENT: 'Installment.svg',
  BILLING_CONFIG: 'BillingConfig.svg',
  HARDWARE_MGMT: 'HardwareMgmt.svg',
  AUTHORIZATION: 'Authorization.svg',
  CUSTOMER: 'Customer.svg',
  E_INSTALLATION: 'EInstallation.svg',
  THIRD_PARTY_PROMO: 'Promo.svg',
  TROUBLE_TICKET: 'TroubleTicket.svg',
  HARDWARE_MANAGEMENT: 'HardwareManagement.svg',
  NTL_LOGO: 'favicon_ntl.png'
}