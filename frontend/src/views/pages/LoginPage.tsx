/**
 * Login Page
 * TODO: Implement login form
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthController';

const LoginPage = () => {
  // TODO: Implement login form with email and password fields
  // TODO: Call useAuth().login() on submit
  // TODO: Navigate to /products on success

  return (
    <div>
      <h1>Login Page - TODO: Implement</h1>
      <Link to="/register">Go to Register</Link>
    </div>
  );
};

export default LoginPage;
