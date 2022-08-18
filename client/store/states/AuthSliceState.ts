import {User} from "../../types/User";

export default interface AuthSliceState{
    isAuth:boolean
    user:User | null
    accessToken:string | null
    isError:boolean
    errorMessage:string | null
    isTryAuthorize:boolean
}