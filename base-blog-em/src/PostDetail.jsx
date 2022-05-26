import { useQuery } from "react-query";
import { fetchComments } from "./serverClient";

// async function fetchComments(postId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
//   );
//   return response.json();
// }

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const {
    data,
    isLoading,
    error,
    isError
  } = useQuery(`comments ${post.id}`, () => fetchComments(post.id));

  if (isLoading) {
    return (
      <div>
        <h3>
          Loading...
        </h3>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h3>
          Ops... Something went wrong!
        </h3>
        <h4>
          {error.toString()}
        </h4>
      </div>
    )
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
