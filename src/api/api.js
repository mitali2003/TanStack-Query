import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const fetchPostData = async (start) => {
  try {
    const res = await api.get(`posts?_start=${start}&_limit=3`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchIndividualData = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    return await api.delete(`/posts/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id) => {
  try {
    return await api.patch(`/posts/${id}`, { title: "I have updated!" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (pageParam = 1) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
