import { components, paths } from "@lib/api/owaru"; // <- generated by openapi-typescript

export const API = {
  //URL: "Back IP",
  URL: "http://localhost:8000",
  AUTH: {
    LOGIN: "api/login/access-token",
    USER: "api/user_info",
    PROFILE: "api/user_info",
    LOGOUT: "logout",

  },
 };
 
 export const APP_ROUTES = {
  LOGIN: "/login",
  STUDENT : {
    INDEX : "/basic-dashboard",
  },
  TEST: "/test"

 };