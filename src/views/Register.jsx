import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { registerSchema } from '../utils/validation';
import AuthLayout from '../components/auth/AuthLayout';
import AuthForm from '../components/auth/AuthForm';

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    registerSchema,
    register
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
      title="Join Our Community!"
      subtitle="Create your account and start exploring delicious Vietnamese cuisine with fast delivery and amazing service."
      isLogin={false}
    >
      <AuthForm
        type="register"
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

export default Register; 