// useObserser({
//   target: loaderRef,
//   onIntersect: fetchNextPage,
//   enabled: hasMore,
// });

// useEffect(() => {
//   if (isFetching) return;
//   observer.current = new IntersectionObserver((entries) =>
//     entries?.map((entry) => {
//       const notificationId = Number(entry.target.getAttribute("data-id"));
//       // const alreadyExists = seenNotifications?.some(
//       //   (notification) => notification?.notifID === notificationId
//       // );

//       if (entry.isIntersecting) {
//         setSeenNotification((prev) => [...prev, { notifID: notificationId }]);
//       }
//     })
//   );
// }, [isFetching]);
// const lastItemRef = useCallback(
//   (node) => {
//     if (isFetching || !hasMore) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     });
//     if (node) observer.current.observe(node);
//   },
//   [isFetching, hasMore]
// );
// import { TodosHome } from "../../components/todosHome/TodosHome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetTodosQuery } from "../../store/api/api";
import styles from "./Home.module.css";

const TOTAL_PAGES = 2;

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const loaderRef = useRef<IntersectionObserver>();
  const [seenNotifications, setSeenNotification] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data: todos, isFetching } = useGetTodosQuery({ page });

  const fetchNextPage = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore]
  );

  const observer = useRef<IntersectionObserver>();
  const notificationRef = useCallback((node: HTMLDivElement) => {
    if (node) observer.current?.observe(node);
  }, []);

  useEffect(() => {
    if (todos) {
      setPosts((prev) => [...prev, ...todos]);
      setHasMore(page !== TOTAL_PAGES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  // console.log("prevs", prevs);
  console.log("posts", posts);

  // console.log("page", page);
  console.log("hasmore", hasMore);
  console.log("seen", seenNotifications);

  useEffect(() => {
    const observerLoad = new IntersectionObserver(fetchNextPage);
    if (observerLoad && loaderRef.current) {
      observerLoad?.observe(loaderRef.current);
    }
    return () => {
      observerLoad?.disconnect();
    };
  }, [fetchNextPage, posts]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) =>
      entries?.map((entry) => {
        const notificationId = Number(entry.target.getAttribute("data-id"));
        const isRead = entry.target.getAttribute("data-read") === "true";

        if (entry.isIntersecting && !isRead) {
          setSeenNotification((prev) => [
            ...new Set([...prev, notificationId]),
          ]);
        }
      })
    );
  }, []);

  return (
    <>
      <div
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
              // ref={posts?.length - 1 === index ? lastItemRef : null}
              key={todo?.id}
              ref={notificationRef}
              style={{
                marginBottom: "50px",
              }}
              data-id={todo?.id}
              data-read={todo?.read}
            >
              <div>{todo?.id}</div>
              <div>{todo?.title}</div>
              <div>{todo?.read ? "Seen" : "Unseen"}</div>
            </div>
          );
        })}
        {!isFetching && <div ref={loaderRef}></div>}
      </div>
    </>
  );
};
