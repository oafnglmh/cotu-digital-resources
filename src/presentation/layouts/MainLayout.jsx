import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Header />

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Outlet />
      </div>
    </div>
  );
}