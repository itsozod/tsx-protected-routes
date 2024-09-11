// import { TodosHome } from "../../components/todosHome/TodosHome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetTestQuery, useGetTodosQuery } from "../../store/api/api";
import styles from "./Home.module.css";
import Item from "antd/es/list/Item";

const TOTAL_PAGES = 2;
// let prev = [];
export const Home = () => {
  const homeRef = useRef();
  const [posts, setPosts] = useState([]);
  const [prevs, setPrevs] = useState([]);
  // const [prevs, setPrevs] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const { data, isFetching } = useGetTestQuery({ page });
  const { data: todos, isFetching } = useGetTodosQuery({ page });
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

  const getIds = todos?.map(({ id }: { id: number }) => {
    return { id: id };
  });
  useEffect(() => {
    if (todos) {
      setPosts((prev) => [...prev, ...todos]);
      setPrevs(getIds);
      setHasMore(page !== TOTAL_PAGES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  console.log("prevs", prevs);
  // console.log("posts", posts);

  // console.log("homeref", homeRef.current?.offsetHeight);

  const readTrue = (ids) => {
    const findIds = posts?.map((post) =>
      ids?.some((item) => post?.id === item?.id)
        ? { ...post, read: true }
        : post
    );
    setPosts(findIds);
    console.log("result", findIds);
  };

  useEffect(() => {
    readTrue(prevs);
  }, [prevs]);
  return (
    <>
      <div
        ref={homeRef}
        className={styles.home_container}
        style={{
          backgroundColor: "lightblue",
          overflow: "auto",
          width: "100%",
          height: "600px",
        }}
      >
        {posts?.map((todo, index, posts) => {
          return (
            <div
              ref={index === posts?.length - 1 ? lastItemRef : null}
              style={{
                marginBottom: "70px",
              }}
              // onClick={() => readTrue(todo?.id)}
            >
              <div>{todo?.id}</div>
              <div>{todo?.title}</div>
              <div>{todo?.read ? "Seen" : "Unseen"}</div>
            </div>
          );
        })}
      </div>
      ;
    </>
  );
};
