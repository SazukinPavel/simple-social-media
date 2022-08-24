import $axios from "../api/axios";
import {UpdateUserDto} from "../types/dto";
import {User} from "../types";

export default class UsersService{

    static subPath='users/'

    static updateUser(dto:UpdateUserDto){
        return $axios.put<User>(this.subPath,dto)
    }
}