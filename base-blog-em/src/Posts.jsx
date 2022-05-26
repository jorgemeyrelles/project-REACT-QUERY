import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react/cjs/react.production.min";

import { PostDetail } from "./PostDetail";
import { fetchPosts } from "./serverClient";
const maxPostPage = 10;

// async function fetchPosts() {
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
//   );
//   return response.json();
// }

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (currentPage < maxPostPage) {
  //     const nextPage = currentPage + 1;
  //     queryClient.prefetchQuery(
  //       ["posts", nextPage],
  //       () => fetchPosts(nextPage));
  //   }
  // }, [currentPage, queryClient]);
  const nextPage = () => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(
        `posts ${nextPage}`,
        () => fetchPosts(nextPage));
    }
    return setCurrentPage((previousValue) => previousValue + 1)
  };
  // replace with useQuery
  const {
    data,
    isLoading,
    isError,
    error,
    status,
  } = useQuery(
    `posts ${currentPage}`,
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true,
    },
    );
  if (isLoading) {
    return (
    <div style={ { width: '100%', textAlign: 'center' } }>
      <h1>{status} ...</h1>
    </div>
    );
  }
  if (isError) {
    return (
    <div style={ { width: '100%', textAlign: 'center' } }>
      <h3>Ops... Something went wrong!</h3>
      <h4>{error.toString()}</h4>
    </div>
    )
  }
  console.log(status);

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 0}
          onClick={() => setCurrentPage((previousValue) => {
            return previousValue === 0 ? 0 : previousValue - 1
          })}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => nextPage()}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
