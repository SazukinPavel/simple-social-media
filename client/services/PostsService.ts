import $axios from "../api/axios";
import Post from "../types/Post";

export default class PostsService{

    static subPath='posts/'

    static fetchPosts(){
        return $axios.get<Post[]>(this.subPath)
    }
}