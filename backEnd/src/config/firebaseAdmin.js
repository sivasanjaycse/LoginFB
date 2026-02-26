import admin from "firebase-admin";

// 1. Paste the entire contents of your downloaded JSON file right here.
// (Make sure to use the NEW key you just generated from Firebase!)
const serviceAccount = {
  type: "service_account",
  project_id: "loginfb-9a454",
  private_key_id: "2454152670f8db6645222bfc887b49f19185bf35",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDWWuWB/0vqj0fW\ndECNZJLA/yzJkDhj1I72d+Dlk+3x65oisrQ8GU/rqq7914pqAZoHgRbx8SRaiI6S\nAfHJLmMe811ORHfOQG2YcMxdMq/lapP9KEvE2XfB54PiDWqXxa0kdw5XdG4gnC+n\nx2o4CKAiBHo4BDCGF9Cq2Jnftx57mBDyLDKu+9ingOKTApna4WcvQywYMz1LvbVq\n4Jv1dGIV45HI9DQBTsqMn3BXYsF95FbNTL/+VAixe+fPqA3MGTkeAyps6CqQUM98\nNTLPp1HR+Jx9F88N8X4yZ8DJCs7+xxueIoRgtqiJUXQSHg7TJ9WPUsi+znB9M8Bv\nqhnYpoCNAgMBAAECggEAEKydcdFULHjc07fTVaxfJhgzebJ4UHu2a0HEAtfRCKKV\nKOHR12L4rpJmbmSX5cseGjtWd5eUhl5dCMqR7l5nY3724SG+WBL284bCvvU0bZou\nzOCXlEZ+ZF0IC0uT4R6Fa3K/cNojvvGnW1vNzXIOUtcaUsUwqR2tI70ZqydpfZ+g\nLwqmZULgtuwA5lkkkOS9FkjCdK0/KILTaCt/YLUE3BXJKx/IxezOPneHTkEAQF7L\n+jFAJo3rTq4hHutkNnUtBKxUPLuyPdNYzg6TquERMrXGQxNF6+QMhOwsxC2EJuFQ\nOhQLYS6tOGugEI6vVMxW7XZUrbejhcXt+byzvbi4AQKBgQDtiKxZGcAa9AyZKYWL\nslksaMxkQrV6eRlBALujCDE1ChWO7uZjezFrZQ34zOMc5lINm0qq4kvu1aOHQUsL\nbB/4xiKLzmq7YGE0PKhtu3C4MmNOOw+9EzTgVOtKtpA4e+7go+LR04xwGl2Jd01e\niGGAFQKlOTUP/kJ4ZznvvPmLjQKBgQDnBOzyZNyiMVv9xPq/65rpLGjiRpeUiTpN\nf2P3NY2eE5shPKFA0imdqNXFllWJaB13cdIozcq+iVGbqFlv9ApZ3EdqcRknmoO2\nF+kUjDEsQ71t854qU2tY0ebVduVuN9lhRcJ8jt6TRNRbR57Hnj/4Y0BDdOlbzhwt\not4pyRkJAQKBgF3GVExExzuc15Br/QX+ngfTQ8XdNCoqvtaTxIADjvGijopENH5X\nt1XvqklsEclqAEDQ6vR1rIaYnxuZolfbEvAywJazIh3hWd62h8PyePivI9dRp8/8\nUiayP8XaNyuledQDv1sZCluDfSP1Dn1gmCVppga2hAVRWsqP7iaAU4BNAoGANIBs\nERJXCg1JqLyRd/hldkR/eZ0tabZeJ6qh31auXpR6Fu2egArDJm9uVb86pUWiHLkj\nV96dCvxOLZ/u44CEsbNcD5awbs2wzTtV3zOVIUgrzsck1N2scb0SRsUEky3iGzct\nYf1eG/3yfOQj853FT//OZQY22oRW5xAyiTCIngECgYBCSmtNsXpX8T30vyPWP7H5\n4bzlEWMAP9iAvqgDLYTAql8/oP8sv9bxb7QLJ5WZBpfAXgQIEeVH059NLGXUcQZm\nTuzrijg5Q2XtMhb1XR+VGPPyzwj1QwpBR/VR1Lvgbe7z64LQeyI7v8l2M5pPeIl7\nRWm0uErpw5M7nDlw5dAnlA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@loginfb-9a454.iam.gserviceaccount.com",
  client_id: "111415870597796420495",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40loginfb-9a454.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// 2. Pass that object directly into the cert() function
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
