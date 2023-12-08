import axios from "axios";

const AUTH_URL = "http://localhost:3000/auth";

const AuthService = axios.create({ baseURL: AUTH_URL });

export default AuthService;
