import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { loginSchema } from '../utils/validation';
import AuthLayout from '../components/auth/AuthLayout';
import AuthForm from '../components/auth/AuthForm';

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    submitError,
  } = useForm(
    {
      email: '',
      password: '',
    },
    loginSchema,
    loginUser
  );

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to continue your culinary journey and explore our delicious Vietnamese cuisine."
      isLogin={true}
    >
      <AuthForm
        type="login"
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onGoogleAuth={handleGoogleLogin}
      />
    </AuthLayout>
  );
};

export default Login; 