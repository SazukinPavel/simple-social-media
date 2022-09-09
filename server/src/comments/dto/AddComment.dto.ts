import { IsString } from "class-validator";

export default class AddCommentDto {
    
    @IsString()
    postId:string    

    @IsString()
    text:string
}
  