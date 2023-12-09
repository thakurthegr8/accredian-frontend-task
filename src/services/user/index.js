import axios from "axios";
import { SERVER_URL } from "../../constants";

const USER_URL = `${SERVER_URL}/users`;

const UserService = axios.create({ baseURL: USER_URL });

export default UserService;
