import { environment } from "../environment";
export const Constant = {
    // API Endpoints
    apiUrl: environment.BASE_URL || "http://localhost:3000/api",
    
    // Authentication
    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        logout: "/api/auth/logout",
        me: "/api/auth/me",
        refresh: "/api/auth/refresh",
    }
};
