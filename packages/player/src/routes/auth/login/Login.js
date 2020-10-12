import React from 'react';

import LoginForm from './LoginForm';
import AuthRouteLayout from '../AuthRouteLayout';

const Login = () => {
  return (
    <AuthRouteLayout>
      <LoginForm />
    </AuthRouteLayout>
  );
};

export default Login;
