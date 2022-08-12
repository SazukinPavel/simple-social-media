import {User} from "../User";

export interface AuthDto{
    user:User
    accessToken:string
}