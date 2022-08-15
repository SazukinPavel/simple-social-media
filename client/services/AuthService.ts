import LoginDto from "../types/dto/Login.dto";
import axios from "../api/axios";
import RegisterDto from "../types/dto/Register.dto";
import AuthDto from "../types/dto/Auth.dto";

export default class AuthService{

    static subPath='auth/'

    static login(dto:LoginDto){
        return axios.post<AuthDto>(this.subPath+'login',dto)
    }

    static register(dto:RegisterDto){
        return axios.post<AuthDto>(this.subPath+'register',dto)
    }
}