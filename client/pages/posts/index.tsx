import { Lenta } from "../../components/busines/";
import React from "react";
import { useRedirect, useTypedDispatch, useTypedSelector } from "../../hooks";
import { FetchPosts } from "../../store/thunks/posts";
import Title from "../../components/seo/Title";
import styles from "../../styles/Posts.module.scss";

const PostsPage = () => {
  const dispatch = useTypedDispatch();
  const { isAuth, isTryAuthorize } = useTypedSelector((state) => state.auth);
  useRedirect("/login", !isAuth, isTryAuthorize);
  React.useEffect(() => {
    if (isAuth) {
      dispatch(FetchPosts());
    }
  }, [isAuth]);

  return (
    <>
      <Title>Posts</Title>
      <div className={["center", styles.Posts].join(" ")}>
        <Lenta />
      </div>
    </>
  );
};

export default PostsPage;
