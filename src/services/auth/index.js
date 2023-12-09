import axios from "axios";

const AUTH_URL = "https://thakurthegr8-accredian-server.onrender.com/auth";

const AuthService = axios.create({ baseURL: AUTH_URL });

export default AuthService;
