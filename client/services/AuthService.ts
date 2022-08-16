import LoginDto from "../types/dto/Login.dto";
import RegisterDto from "../types/dto/Register.dto";
import AuthDto from "../types/dto/Auth.dto";
import $axios from "../api/axios";

export default class AuthService{

    static subPath='auth/'

    static login(dto:LoginDto){
        return $axios.post<AuthDto>(this.subPath+'login',dto)
    }

    static register(dto:RegisterDto){
        return $axios.post<AuthDto>(this.subPath+'register',dto)
    }

    static tryAuthorize(){
        return $axios.post<AuthDto>(this.subPath+'access',null,{withCredentials:true})
    }
}