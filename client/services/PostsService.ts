import $axios from "../api/axios";
import {AddPostDto, PostReviewResponseDto, SetPostReviewDto} from "../types/dto";
import {Post} from "../types";

export default class PostsService{

    static subPath='posts/'
    static subPathPostReview='post-reviews'

    static fetchPosts(){
        return $axios.get<Post[]>(this.subPath)
    }

    static fetchMyPosts(){
        return $axios.get<Post[]>(this.subPath+'me')
    }

    static createPost({picture,text}:AddPostDto){
        const fd=new FormData()
        if(picture){
            fd.append('picture',picture[0])
        }
        fd.append('text',text)
        return $axios.post(this.subPath,fd,{ headers: {
                'Content-Type': 'multipart/form-data;'
            }})
    }

    static setPostReview(dto:SetPostReviewDto){
        return $axios.post<PostReviewResponseDto>(this.subPathPostReview,dto)
    }

    static deletePostReview(id:string){
        return $axios.delete<PostReviewResponseDto>(this.subPathPostReview+'/'+id)
    }
}