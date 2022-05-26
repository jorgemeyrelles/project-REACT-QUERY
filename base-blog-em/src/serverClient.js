import axios from 'axios';

async function fetchPosts(page) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.data;
}

async function fetchComments(postId) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.data;
}

async function deletePost(postId) {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
  );
  return response.data;
}

async function updatePost(postId) {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.data;
}

export { fetchPosts, deletePost, updatePost, fetchComments };