import { Comment } from "../../../types"
import CommentCard from "./CommentCard"
import EmptyComments from "./EmptyComments"

interface CommentsCardProps{
    comments?:Comment[]
}

const CommentsList:React.FC<CommentsCardProps>=({comments})=>{

    if(!comments || !comments.length){
        return <EmptyComments/>
    }

    return(
        <div>
            {comments.map((comment)=><CommentCard comment={comment}/>)}
        </div>
    )
}

export default CommentsList