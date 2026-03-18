import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { publicRoutes } from "./publicRoutes";
import Loading from "../presentation/pages/Loading";

export default function AppRoutes() {
  const routes = useRoutes([
    ...publicRoutes,
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ]);

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
}