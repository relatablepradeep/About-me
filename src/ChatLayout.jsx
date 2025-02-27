import { Outlet, Navigate } from "react-router"; // 
import { useEffect, useState } from "react";


const ChatLayout = () => {
  
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "user");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  
  if (userRole === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="chat-container">
      <Outlet></Outlet>
    
    </div>
  );
};

export default ChatLayout;
