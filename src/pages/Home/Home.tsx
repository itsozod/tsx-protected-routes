// import { TodosHome } from "../../components/todosHome/TodosHome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetTestQuery } from "../../store/api/api";
import styles from "./Home.module.css";
import { Button } from "antd";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data, isFetching } = useGetTestQuery({ page });
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node) => {
      if (isFetching || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );
  console.log("posts", data?.length);
  console.log("page", page);

  useEffect(() => {
    if (data?.length === 100) {
      setHasMore(false);
    }
  }, [data]);

  return (
    <>
      <Button onClick={() => setPage((prevPage) => prevPage + 1)}>Inc</Button>
      <div className={styles.home_container}>
        {data?.map((post, index, posts) => {
          return (
            <div
              ref={index === posts?.length - 1 ? lastItemRef : null}
              style={{
                marginBottom: "20px",
              }}
            >
              <div>{post?.id}</div>
              <div>{post?.body}</div>
            </div>
          );
        })}
      </div>
      ;
    </>
  );
};
