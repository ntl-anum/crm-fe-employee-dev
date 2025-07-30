/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Common environment variables (shared across all envs)
    USER: "username",
    TOKEN: "token",
    IS_VERIFIED: "isVerified",
    ENCRYPT_KEY: "5f0f1bd40ff1fd547aca01d72f02bbc0",
    HMAC_KEY: "2F92A47C4FDB99B4CB7338C4979A8",
    COOKIE_NAME: "SH_NAY_COOK",
    XOR_KEY: "m4r5l33n",
    ENCRYPTION_KEY: "wJq9QPFOdL2eMvUVPNIc9voEeNcaTwlu",

    // Dynamic URLs based on NODE_ENV
    ...(process.env.NODE_ENV === "production"
      ? {
          ENVIRONMENT: "PRODUCTION",
          FE_IP: "ncrmconfig.nayatel.com",
          FRONTEND_URL: "https://ncrmconfig.nayatel.com/",
          BACKEND_URL: "https://crmbeconfig.nayatel.com/",
          CONFIG_SERVICES_URL: "https://crmbeconfig.nayatel.com/",
          AUTH_SERVICE_URL: "https://crmbeauth.nayatel.com/",
          BILLING_SERVICE_URL: "https://crmbebilling.nayatel.com/",
          CUSTOMER_SERVICE_URL: "https://crmbecustomer.nayatel.com/",
          FTP_SERVICE_URL: "https://crmbeftp.nayatel.com/",
          INTIMATION_SERVICE_URL: "https://crmbeintimations.nayatel.com/",
          BILLING_SERVICE_FRONTEND_URL: "https://ncrmbilling.nayatel.com/",
          CRM_URL_LINK: "https://crm.nayatel.com/views/crmViews/nayatelCrm/",
        }
      : process.env.NODE_ENV === "staging"
      ? {
          ENVIRONMENT: "STAGING",
          FE_IP: "crmfeconfigstg.nayatel.com",
          FRONTEND_URL: "https://crmfeconfigstg.nayatel.com/",
          BACKEND_URL: "https://crmbeconfigstg.nayatel.com/",
          CONFIG_SERVICES_URL: "https://crmbeconfigstg.nayatel.com/",
          AUTH_SERVICE_URL: "https://crmbeauthstg.nayatel.com/",
          BILLING_SERVICE_URL: "https://crmbebillingstg.nayatel.com/",
          CUSTOMER_SERVICE_URL: "https://crmbecustomerstg.nayatel.com/",
          FTP_SERVICE_URL: "https://crmbeftpstg.nayatel.com/",
          INTIMATION_SERVICE_URL: "https://crmbeintimations.nayatel.com/",
          BILLING_SERVICE_FRONTEND_URL: "https://crmfebillingstg.nayatel.com/",
          CRM_URL_LINK: "https://crmstg.nayatel.com/views/crmViews/nayatelCrm/",
        }
      : {
          // Default to LOCAL
          ENVIRONMENT: "LOCAL",
          FE_IP: "crmfeconfig.nayatel.com",
          FRONTEND_URL: "https://crmfeconfig.nayatel.com/",
          BACKEND_URL: "https://crmbeconfig.nayatel.com/",
          CONFIG_SERVICES_URL: "https://abc.nayatel.com:83/",
          // AUTH_SERVICE_URL: "https://crmbeauth.nayatel.com/",
          AUTH_SERVICE_URL: "https://abc.nayatel.com:89/",
          BILLING_SERVICE_URL: "https://crmbebilling.nayatel.com/",
          CUSTOMER_SERVICE_URL: "https://crmbecustomer.nayatel.com/",
          FTP_SERVICE_URL: "https://crmbeftp.nayatel.com/",
          INTIMATION_SERVICE_URL: "https://crmbeintimations.nayatel.com/",
          BILLING_SERVICE_FRONTEND_URL: "https://crmfebilling.nayatel.com/",
          CRM_URL_LINK: "https://crm.nayatel.com/views/crmViews/nayatelCrm/",
        }),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
