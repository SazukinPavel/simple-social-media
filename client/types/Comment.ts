import Post from "./Post";
import { User } from "./User";

export default interface Comment {
    owner:User
    post:Post
    text:string
}
