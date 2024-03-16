import { useEffect } from "react";

import { useLazyGetTodosRequestIdQuery } from "../../store/api/api";
import { useSearchParams } from "react-router-dom";

export const RequestData = () => {
  const [getTodosRequestId, { data }] = useLazyGetTodosRequestIdQuery();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    if (id) {
      getTodosRequestId(id);
    }
  }, [id, getTodosRequestId]);

  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.title}</p>
      <p>{JSON.stringify(data?.done)}</p>
    </div>
  );
};
