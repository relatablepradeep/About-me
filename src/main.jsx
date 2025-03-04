import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router"; 
import { Auth0Provider } from "@auth0/auth0-react";

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
    <Route path="/" element={<Root />}>
      {/* Main Pages */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="project" element={<Project />} />
      <Route path="service" element={<Service />} />

      {/* Chat Pages */}
      <Route path="chat" element={<ChatLayout />}>
        <Route index element={<UserChat />} />
        <Route path="admin" element={<AdminChat />} />
      </Route>
    </Route>
  )
);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="relatablepradeep.us.auth0.com"
      clientId="opaPo1umSvwX97tiso3TOzGcOoIAQhKb"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/chat`,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>
);
