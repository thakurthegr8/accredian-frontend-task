import axios from "axios";

const USER_URL = "https://thakurthegr8-accredian-server.onrender.com/users";

const UserService = axios.create({ baseURL: USER_URL });

export default UserService;
