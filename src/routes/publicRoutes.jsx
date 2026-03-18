import { lazy } from "react";
import MainLayout from "@/presentation/layouts/MainLayout";
import { ROUTES } from "./routePath";

const Home = lazy(() => import("@/presentation/pages/Home"));

export const publicRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
    ],
  },
];