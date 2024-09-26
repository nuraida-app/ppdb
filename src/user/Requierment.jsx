import React from "react";
import { useGetPostsQuery } from "../api/service/postApi";

const createMarkup = (html) => {
  return { __html: html };
};

const Requierment = () => {
  const { data } = useGetPostsQuery();

  const posts = data?.filter((d) => d.kategori === "petunjuk");
  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} dangerouslySetInnerHTML={createMarkup(post.teks)} />
      ))}
    </>
  );
};

export default Requierment;
