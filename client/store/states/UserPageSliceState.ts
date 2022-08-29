import {User} from "../../types";

export default interface UserPageSliceState{
    user?:User
    isUserNotExist:boolean
}