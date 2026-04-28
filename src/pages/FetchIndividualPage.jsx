import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchIndividualData } from "../api/api";

const FetchIndividualPage = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchIndividualData(id),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError)
    return <p>{error ? error.message : "Something went wrong..."}</p>;

  return (
    <div
      style={{
        padding: "10px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <p>Id: {data.id}</p>
      <p>Title : {data.title}</p>
      <p>Body : {data.body}</p>
      <NavLink to="/rq">Go Back</NavLink>
    </div>
  );
};

export default FetchIndividualPage;
