import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Worker = lazy(() => import("@/pages/worker/Worker"));
const Login = lazy(() => import("@/pages/Login"));
const Publish = lazy(() => import("@/pages/Publish"));
const Demo = lazy(() => import("@/pages/Demo"));

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/worker/:id?" element={<Worker />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/Demo" element={<Demo />} />
    </Routes>
  );
};

export default Router;
