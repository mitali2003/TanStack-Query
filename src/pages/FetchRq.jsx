import { useNavigate } from "react-router-dom";
import { fetchPostData } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const FetchRq = () => {
  const navigate = useNavigate();
  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["posts"], //useState
    queryFn: fetchPostData, //useEfect
    // gcTime: 1000, //garbage collection time
    // staleTime: 2000, // when we change page , every time api is not call after thistome api is call.
    // refetchInterval: 1000, //call api after every 1sec.
    // refetchIntervalInBackground: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>{error ? error.message : "Something went wrong..."}</p>;

  return (
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
  );
};

export default FetchRq;
