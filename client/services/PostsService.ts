import $axios from "../api/axios";
import {AddPostDto, PostReviewResponseDto, SetPostReviewDto} from "../types/dto";
import {Post} from "../types";
import UpdatePostDto from "../types/dto/UpdatePost.dto";

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

    static fetchUserPosts(userId:string){
        return $axios.get('posts',{params:{user:userId}})
    }

    static setPostReview(dto:SetPostReviewDto){
        return $axios.post<PostReviewResponseDto>(this.subPathPostReview,dto)
    }

    static deletePostReview(id:string){
        return $axios.delete<PostReviewResponseDto>(this.subPathPostReview+'/'+id)
    }

    static findById(postId:string){
        return $axios.get<Post>(this.subPath+postId)
    }

    static deletePost(postId:string){
        return $axios.delete<Post>((this.subPath+postId))
    }

    static updatePost(dto:UpdatePostDto){
        return $axios.put(this.subPath,dto)
    }
}