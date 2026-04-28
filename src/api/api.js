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
