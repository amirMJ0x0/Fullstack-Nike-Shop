import * as Yup from 'yup'

//Login Form Validation
export const loginValidationSchema = Yup.object({
    emailOrUsername: Yup.string()
        .test(
            'email-or-username',
            'Enter a valid email or username (min 3 chars)',
            value => {
                if (!value) return false;
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                return isEmail || value.length >= 3;
            }
        )
        .required('Email or username is required'),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

//Register Form Validation
export const registerValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required")
})
