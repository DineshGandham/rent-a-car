import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
//   password: yup
//     .string()
//     .trim()
//     .min(6, 'Password must be at least 6 characters')
//     .required('New password is required'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords do not match')
//     .required('Confirm password is required'),
});
