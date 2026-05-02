import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchPostData, updatePost } from "../api/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const FetchRq = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], //useState
    queryFn: () => fetchPostData(pageNumber), //useEfect
    // gcTime: 1000, //garbage collection time
    // staleTime: 2000, // when we change page , every time api is not call after thistome api is call.
    // refetchInterval: 1000, //call api after every 1sec.
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData, //If I'm not using this then while data is loading at that time it display loading text and then data but I dont need to display loading text so use this property.
  });

  const queryClint = useQueryClient();

  const deleteMutaion = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClint.setQueryData(["posts", pageNumber], (data) =>
        data.filter((post) => post.id !== id),
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      queryClint.setQueryData(["posts", pageNumber], (postData) =>
        postData.map((el) =>
          el.id === postId
            ? {
                ...el,
                title: apiData.data.title,
              }
            : el,
        ),
      );
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>{error ? error.message : "Something went wrong..."}</p>;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {data?.map(({ id, title, body }) => (
          <div
            key={id}
            style={{
              border: "1px solid black",
              padding: "8px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/rq/${id}`)}
          >
            <p>{id}</p>
            <p>{title}</p>
            maxWidth:"500px"
            <p>{body}</p>
            <div
              style={{
                gap: "8px",
              }}
            >
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutaion.mutate(id);
                }}
              >
                Delete
              </button>
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateMutation.mutate(id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            border: "1px solid black",
          }}
          onClick={() => setPageNumber((prev) => prev - 3)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button
          style={{
            border: "1px solid black",
          }}
          onClick={() => setPageNumber((prev) => prev + 3)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FetchRq;
