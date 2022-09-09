import React from "react";
import { CommentsList, PostCard } from "../../../components/busines";
import Title from "../../../components/seo/Title";
import { GetServerSideProps, NextPage } from "next";
import { Post } from "../../../types";
import { wrapper } from "../../../store";
import { useTypedDispatch } from "../../../hooks";
import { setPostPage } from "../../../store/slices/postPageSlice";
import { addPostToPosts } from "../../../store/slices/postsSlice";
import { PostsService } from "../../../services";

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({post}) => {

    const dispatch = useTypedDispatch()

    React.useEffect(() => {
        dispatch(setPostPage(post));
        dispatch(addPostToPosts(post));
    }, [])

    if (!post) {
        return (
            <div>
                <Title>Loading...</Title>
            </div>
        );
    }

    return (
        <>
            <Title>{post.text.slice(0, 10)}</Title>
            <div className={"center"}>
                <PostCard {...post} />
                <CommentsList comments={post.comments}/>
            </div>
        </>
    );
};


export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        try {
            const id = ctx.params?.id as string;
            const post = (await PostsService.findByIdWithComments(id)).data;
            if (!post) {
                return {
                    notFound: true,
                };
            }
            return {
                props: {post},
            };
        } catch (e) {
            return {
                notFound: true,
            };
        }
    });


export default PostPage;

