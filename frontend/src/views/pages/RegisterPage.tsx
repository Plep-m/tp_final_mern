/**
 * Register Page
 * TODO: Implement registration form
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  // TODO: Implement registration form with email, password, firstName, lastName
  // TODO: Call ApiService.register() on submit
  // TODO: Navigate to /login on success

  return (
    <div>
      <h1>Register Page - TODO: Implement</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default RegisterPage;
