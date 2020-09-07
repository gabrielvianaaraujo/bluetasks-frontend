import Axios from "axios";
import { AUTH_ENDPOINT, JWT_TOKEN_NAME } from "../constants";

class AuthService {

    login(username, password, onLogin){
        Axios.post(`${AUTH_ENDPOINT}/login`, { username: username, password: password})
            .then(response => {
                const jwtToken = response.headers['authorization'].replace("Bearer ", "");
                sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
                onLogin(true);
            }).catch(error => {
                console.error(error);
                onLogin(false);
            });
            
            console.log(`Endpoint: ${AUTH_ENDPOINT}`);
    }

    getJWTToken(){
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    isAuthenticated(){
        return this.getJWTToken() != null;
    }

}

export default new AuthService();