import {User} from "../../types/User";

export default interface AuthSliceState{
    isAuth:boolean
    user:User | null
    accessToken:string | null
}