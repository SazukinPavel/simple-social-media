import $axios from "../api/axios";
import {AddPostDto, PostReviewResponseDto, SetPostReviewDto} from "../types/dto";
import {Post} from "../types";

export default class PostsService{

    static subPath='posts/'
    static subPathPostReview='post-reviews'

    static fetchPosts(){
        return $axios.get<Post[]>(this.subPath)
    }

    static createPost(dto:AddPostDto){
        return $axios.post(this.subPath,dto)
    }

    static setPostReview(dto:SetPostReviewDto){
        return $axios.post<PostReviewResponseDto>(this.subPathPostReview,dto)
    }

    static deletePostReview(id:string){
        return $axios.delete<PostReviewResponseDto>(this.subPathPostReview+'/'+id)
    }
}