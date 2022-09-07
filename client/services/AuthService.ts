import $axios from "../api/axios";
import { AuthDto, LoginDto, RegisterDto } from "../types/dto";

export default class AuthService {
  static subPath = "auth/";

  static login(dto: LoginDto) {
    return $axios.post<AuthDto>(this.subPath + "login", dto);
  }

  static register(dto: RegisterDto) {
    return $axios.post<AuthDto>(this.subPath + "register", dto);
  }

  static tryAuthorize() {
    return $axios.post<AuthDto>(this.subPath + "access", null);
  }

  static logout() {
    return $axios.post(this.subPath + "logout");
  }
}
