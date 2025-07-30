export const BACKEND_ROUTES = {
  // start::Auth Module Routes
  AUTH: {
    LOGIN: "auth/login",
    EXPIRE_TOKEN: "auth/expireToken",
    SEND_VERIFY_ROUTE: "auth/send-verification-code",
    VERIFY_ROUTE: "auth/verify-code",
    LOGOUT_USER: "auth/logout-user",
    PROFILE_PIC_ROUTE: "utility/pfp",
    CRM_LOGIN:
      process.env.NODE_ENV === "production"
        ? "https://crm.nayatel.com/nhrms/LoginController/"
        : process.env.NODE_ENV === "staging"
        ? "https://crmstg.nayatel.com/nhrms/LoginController/"
        : "https://crmdev.nayatel.com/nhrms/LoginController/",
  },
  // end::Auth Module Routes
};
