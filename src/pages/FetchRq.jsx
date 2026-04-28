import { useNavigate } from "react-router-dom";
import { fetchPostData } from "../api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
