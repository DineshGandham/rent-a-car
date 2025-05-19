import * as yup from 'yup';

const emailOrUsernameRegex = /^[a-zA-Z0-9_.-]+$/;

export const loginSchema = yup.object().shape({
    username:yup
        .string()
        .required('Username or Email is required')
        .test('is-email-or-username', 'Enter a valid email or username',(value)=>{
            const isEmail = yup.string().email().isValidSync(value);
            const isUserName = emailOrUsernameRegex.test(value || '');
            return isEmail || isUserName;
        }),
    password:yup
        .string()
        .min(6, 'password must be at least 6 characters')
        .required('password is required')
})