import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Outlet />
      </div>
    </div>
  );
}