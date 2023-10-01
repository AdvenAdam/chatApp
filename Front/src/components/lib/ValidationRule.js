import * as Yup from 'yup'

export const LoginSchema = Yup.object({
    username: Yup.string()
        .required('Username Required')
        .min(6, 'Username Too Short !')
        .max(20, 'Username To Long'),
    password: Yup.string()
        .required('Password Required')
        .min(6, 'Password Too Short !')
        .max(20, 'Password To Long'),
})

export const AddFriendSchema = Yup.object({
    friendName: Yup.string()
        .required('Username Required')
        .min(6, 'Invalid Username')
        .max(20, 'Invalid Username'),
})
