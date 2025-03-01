import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { User, Lock, Mail, UserCheck } from "lucide-react";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      handleSuccessfulAuth();
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, you'd make API calls to your backend here
      // For demo purposes, we'll simulate authentication and set roles
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo: Set admin for specific email
      const isAdmin = email.toLowerCase() === "admin@example.com";
      
      // Store user info in localStorage (in a real app, you'd use secure methods)
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", isSignUp ? name : email.split('@')[0]);
      localStorage.setItem("role", isAdmin ? "admin" : "user");
      localStorage.setItem("isAuthenticated", "true");
      
      handleSuccessfulAuth();
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSuccessfulAuth = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/chat");
    }
  };

  const handleAuth0Login = () => {
    loginWithRedirect();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isSignUp 
            ? "Sign up to start chatting with our team" 
            : "Sign in to continue your conversation"}
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-3 border-r">
                  <UserCheck className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 text-gray-700 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 border-r">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-gray-700 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 border-r">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-gray-700 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isSignUp ? "Sign Up" : "Sign In"
              )}
            </button>
          </div>
          
          <div className="relative flex py-3 items-center mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="mb-6">
            <button
              type="button"
              onClick={handleAuth0Login}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" fill="white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with OAuth
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:text-blue-700 font-semibold ml-1 focus:outline-none"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;