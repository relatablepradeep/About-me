import { Outlet, Navigate } from "react-router"; // 
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ChatLayout = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "user");

  useEffect(() => {
    const fetchRole = async () => {
      if (isAuthenticated && user) {
        const role = user?.roles?.[0] || "user"; // Assuming roles are in the `user` object
        localStorage.setItem("role", role);  // Save the role to localStorage
        setUserRole(role);
      }
    };
    fetchRole();
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to `/chat/admin` if the user is an admin
  if (userRole === "admin") {
    return <Navigate to="/chat/admin" replace />;
  }

  return (
    <div className="chat-container">
      <Outlet />
    </div>
  );
};

export default ChatLayout;
