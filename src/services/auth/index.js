import axios from "axios";
import { SERVER_URL } from "../../constants";

const AUTH_URL = `${SERVER_URL}/auth`;

const AuthService = axios.create({ baseURL: AUTH_URL });

export default AuthService;
