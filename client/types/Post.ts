import {User} from "./User";

export default interface Post{
    pictureName: string;

    text: string;

    likesCount: number;

    owner?: User;

    _id:string
}