import * as yup from 'yup';

export const addressSchema = yup.object().shape({
  street: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State/Province is required'),
  country: yup.string().required('Country is required'),
  zipCode: yup.string().required('Zip/Postal Code is required'),
  phone: yup.string().required('Phone number is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
}); 