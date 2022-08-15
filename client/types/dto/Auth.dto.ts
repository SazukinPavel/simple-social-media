import {User} from "../User";

export default interface AuthDto{
    user:User
    accessToken:string
}