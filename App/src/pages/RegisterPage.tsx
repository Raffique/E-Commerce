import React from 'react';
import Container from '../components/ui/Container';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="py-12 min-h-[calc(100vh-14rem)] flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Create an Account</h1>
          <RegisterForm />
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;