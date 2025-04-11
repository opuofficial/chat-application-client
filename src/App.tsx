import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { protectedRoutes, publicRoutes } from "./routes/router";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const theme = {
  token: {
    colorPrimary: "#f97316",
  },
};

const data = localStorage.getItem("Chat-Application");
let token = "";

if (data) {
  token = JSON.parse(data).token;
}

export const socket = io(import.meta.env.VITE_API_BACKEND_URL, {
  autoConnect: true,
  query: {
    token: token || "",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Navigate to="/messages" replace />} />

          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}

          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  <route.element />
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>

        <Toaster position="top-center" reverseOrder={false} />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
