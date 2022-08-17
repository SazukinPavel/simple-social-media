import $axios from "../api/axios";
import Post from "../types/Post";
import AddPostDto from "../types/dto/AddPost.dto";

export default class PostsService{

    static subPath='posts/'

    static fetchPosts(){
        return $axios.get<Post[]>(this.subPath)
    }

    static createPost(dto:AddPostDto){
        return $axios.post<AddPostDto,Post>(this.subPath,dto)
    }
}