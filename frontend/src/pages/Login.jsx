import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate(); 

  // Use Google API for login 
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '1019204573638-idur8n8gm5bin1nsq7h7q7dpkae341jq.apps.googleusercontent.com', 
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    // Send the Google ID token to your backend for authentication
    axios.post('/api/auth/google', { token: response.credential })
      .then(response => {
        console.log('Login successful:', response);
        // Redirect to the portfolio page on successful login
        navigate('/portfolio');
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <div id="google-signin-btn"></div>
    </div>
  );
};

export default Login;
