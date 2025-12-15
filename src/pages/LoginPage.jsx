import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router';
import CheckPassword from '../components/CheckPassword';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
// import { getFirebaseErrorMessage } from '../firebase/firebaseErrorMessages';
// import { updateProfile } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
import { AuthContext } from '../contexts/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const LoginPage = () => {
    const { setUser, 
        // signInWithPassword, googleSignin
     } = useAuth()
    const [showPass, setShowPass] = useState(false);
    //const [password, setPassword] = useState('');
    // const [isPasswordOkay, set_isPasswordOkay] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // console.log(params.get("next"))
    const next = decodeURIComponent(params.get("next") || '') || "/";

    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        // watch,
        //control,
        formState: { errors },
    } = useForm()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        //console.log(data)
        setSubmitting(true)

        // console.log(res)

        const email = data.email
        const password = data.password
        // console.log(name, email, photo, password)
        // signInWithPassword(email, password)
        //     .then(async () => {
        //             toast("Login success.")
        //             setSubmitting(false)
        //             navigate(next)
        //     })
        //     .catch(err => {
        //         setSubmitting(false)
        //         toast(getFirebaseErrorMessage(err));
        //     })
        try {
            const login = await axiosSecure.post('/login', { email, password })
            toast(login.data.message)
            if (login.data.user) {
                setUser({ ...login.data.user })
                navigate(next)
            }
        } catch (err) {
            err;
            toast.error("Login failed.")
            setSubmitting(false)
        }

        setSubmitting(false)

    }

    // const handleGoogleSignin = () => {
    //     setSubmitting(true)
    //     googleSignin()
    //         .then(() => {
    //             setSubmitting(true)
    //             navigate(next)
    //         })
    //         .catch(err => {
    //             setSubmitting(false)
    //             toast(getFirebaseErrorMessage(err));
    //         })
    // }

    // const password = useWatch({ control, name: "password" });
    // const passwordError = CheckPassword({ password: password ?? '' })

    return (
        <div className="min-h-[80vh] max-[800px]:min-h-[100vw] p-4 my-10 flex flex-col items-center justify-center ">
            {/* <Title value={`${AppName} - Register`}></Title> */}
            <div className="max-w-155! text-center">
                <h2>Welcome back</h2>
                <h3>Don't have an account? <Link to={`/signup${location.search}`} className='text-primary'>Sign up</Link></h3>
            </div>
            <div className="container px-0! max-w-155!  bg-base-100 shadow-2xl rounded-3xl flex flex-col items-center justify-center overflow-hidden">
                <h2 className='font-bold mb-5 text-center text-white bg-blue-300 w-full p-4'>LOGIN</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-2 w-9/10 md:w-8/10'>


                    <h3 className='text-primary mb-0'>Email:</h3>
                    <input type="email" {...register("email", { required: 'Email is required' })} className='input md:input-lg w-full' placeholder='Enter your email address' />

                    {errors.email && <p class="error">{errors.email.message}</p>}

                    <h3 className='text-primary mb-0'>Password:</h3>
                    <div className='relative'>
                        <input type={showPass ? 'text' : 'password'} {...register("password", { required: 'Password is required' })} className='input md:input-lg w-full' placeholder='Enter Your password' /> <button type='button' onClick={() => setShowPass(!showPass)} className='z-99 absolute top-1/2 -translate-y-1/2 right-4 select-none'> {showPass ? <BsEyeSlashFill /> : <BsEyeFill />}</button>
                    </div>

                    {errors.password && <p class="error">{errors.password.message}</p>}

                    {/* {password ? passwordError : ""} */}


                    {/* <input  type="submit" value="Register" className='btn btn-primary w-full' /> */}
                    <button disabled={isSubmitting} className='btn btn-primary md:btn-lg w-full'>Login</button>

                    {/* <div> Already have an account? login </div> */}

                    {/* <div className='divider'>Social login</div>

                    <button type='button'
                        onClick={handleGoogleSignin}
                        className="btn md:btn-lg bg-base-100 border-gray-200 mb-4">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button> */}

                    <div className="h-4"></div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;