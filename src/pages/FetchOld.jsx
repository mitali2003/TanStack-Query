import { fetchPostData } from "../api/api";
import { useEffect, useEffectEvent, useState } from "react";

const FetchOld = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetchPostData();
      if (res) {
        setIsLoading(false);
        setData(res);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;

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
          }}
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

export default FetchOld;
