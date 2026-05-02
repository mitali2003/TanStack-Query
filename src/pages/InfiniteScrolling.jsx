import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";

const InfiniteScrolling = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam }) => fetchUsers(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  return (
    <div>
      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page?.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "10px",
                border: "1px solid black",
              }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      {isFetchingNextPage && <div>oading More...</div>}
    </div>
  );
};

export default InfiniteScrolling;
