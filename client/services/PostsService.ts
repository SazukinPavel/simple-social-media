import $axios from "../api/axios";
import Post from "../types/Post";
import AddPostDto from "../types/dto/AddPost.dto";
import SetPostReviewDto from "../types/dto/SetPostReview.dto";

export default class PostsService{

    static subPath='posts/'

    static fetchPosts(){
        return $axios.get<Post[]>(this.subPath)
    }

    static createPost(dto:AddPostDto){
        return $axios.post(this.subPath,dto)
    }

    static setPostReview(dto:SetPostReviewDto){
        return $axios.post(this.subPath,dto)
    }

    static deletePostReview(id:string){
        return $axios.delete(this.subPath+'/'+id)
    }
}