import React from 'react';
const API_BASE_URL = "http://localhost:5000";

const Login = () => {
  
  const handleGoogleLogin = () => {
    // Redirect user to the backend authentication route
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
