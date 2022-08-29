import $axios from "../api/axios";
import {UpdateUserDto} from "../types/dto";
import {User} from "../types";

export default class UsersService{

    static subPath='users/'

    static updateUser({avatarPicture,bio}:UpdateUserDto){
        const fd=new FormData()
        if(avatarPicture){
            fd.append('avatarPicture',avatarPicture[0])
        }
        fd.append('bio',bio)
        return $axios.put<User>(this.subPath,fd,{headers: {
                'Content-Type': 'multipart/form-data;'
        }})
    }

    static getUserById(id:string){
        return $axios.get<User>(this.subPath+id)
    }
}