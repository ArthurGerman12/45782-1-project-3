import axios from "axios";
import type Login from "../models/Login";
import type SignUpData from "../models/SignUp";

class AuthService {
    async login(login: Login): Promise<{ jwt: string }> {
        const { data } = await axios.post<{ jwt: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, login);
        return data;
    }

    async signup(data: SignUpData): Promise<{jwt: string}> {
        const response = await axios.post<{ jwt: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/signup`, data);
        return response.data;
    }
}

const authService = new AuthService();
export default authService;