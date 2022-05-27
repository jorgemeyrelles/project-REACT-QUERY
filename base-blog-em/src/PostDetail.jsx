import { useMutation, useQuery } from "react-query";
import {
  deletePost,
  fetchComments,
  updatePost,
} from "./serverClient";

// async function fetchComments(postId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
//   );
//   return response.json();
// }

// async function deletePost(postId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/postId/${postId}`,
//     { method: "DELETE" }
//   );
//   return response.json();
// }

// async function updatePost(postId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/postId/${postId}`,
//     { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
//   );
//   return response.json();
// }

export function PostDetail({ post }) {
  // replace with useQuery
  const {
    data,
    isLoading,
    error,
    isError
  } = useQuery(`comments ${post.id}`, () => fetchComments(post.id));

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

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
      <div style={ { display: 'flex', width: '200px', justifyContent: 'space-between' } }>
        <button
          type="button"
          onClick={() => deleteMutation.mutate(post.id)}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => updateMutation.mutate(post.id)}
        >
          Update title
        </button>
      </div>
      {deleteMutation.isError && (
          <div>
            <p style={{ color: 'red' }}>Something went wrong! {deleteMutation.error.toString()}</p>
          </div>
        )}
      {deleteMutation.isLoading && (
          <div>
            <p style={{ color: 'blue' }}>{`${deleteMutation.status.toUpperCase()} ...`}</p>
          </div>
        )}
      {deleteMutation.isSuccess && (
          <div>
            <p style={{ color: 'green' }}>{`DELETED ${deleteMutation.status.toUpperCase()}FULLY`}</p>
          </div>
        )}
      {updateMutation.isError && (
        <div>
          <p style={ { color: 'red' } }>Something went wrong! {updateMutation.error.toString()}</p>
        </div>
      )}
      {updateMutation.isLoading && (
        <div>
          <p style={ { color: 'blue' } }>{`${updateMutation.status.toUpperCase()} ...`}</p>
        </div>
      )}
      {updateMutation.isSuccess && (
        <div>
          <p style={ { color: 'green' } }>{`UPDATED ${updateMutation.status.toUpperCase()}FULLY`}</p>
        </div>
      )}
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
