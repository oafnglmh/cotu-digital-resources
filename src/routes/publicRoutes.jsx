import { lazy } from "react";
import MainLayout from "@/presentation/layouts/MainLayout";
import { ROUTES } from "./routePath";

const Home = lazy(() => import("@/presentation/pages/Home"));
const Book = lazy(() => import("@/presentation/pages/Book"));
const Ase  = lazy(() => import("@/presentation/pages/Ase"));

export const publicRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.BOOK,
        element: <Book />,
      },
      {
        path: ROUTES.ASE,
        element: <Ase />,
      },
    ],
  },
];