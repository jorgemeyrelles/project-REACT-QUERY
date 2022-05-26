import { useState } from "react";
import { useQuery } from "react-query";

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

  // replace with useQuery
  const { data, isLoading, isError, error }= useQuery("posts", fetchPosts);
  if (isLoading) {
    return (
    <div style={ { width: '100%', textAlign: 'center' } }>
      <h1>Loading ...</h1>
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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
