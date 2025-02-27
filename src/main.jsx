import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import "./index.css";
import Root from "./Root";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Project from "./Components/Project/Project";
import Service from "./Components/Service/Service";
import ChatLayout from "./ChatLayout";
import UserChat from "./Components/Chat/UserChat";
import AdminChat from "./Components/Chat/AdminChat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Layout (With Header & Footer) */}
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="project" element={<Project />} />
        <Route path="service" element={<Service />} />
      </Route>

      {/* Separate Chat Layout (No Header/Footer) */}
      <Route element={<ChatLayout />}>
        <Route path="/chat" element={<UserChat />} />
        <Route path="/admin" element={<AdminChat />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
