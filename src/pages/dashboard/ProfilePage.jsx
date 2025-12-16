import React, { useEffect, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import CheckPassword from '../../components/CheckPassword';
import { useForm, useWatch } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
// import { getFirebaseErrorMessage } from '../firebase/firebaseErrorMessages';
// import { updateProfile } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ProfilePage = () => {
    const { setUser, user
        // signUpWithPassword, googleSignin
    } = useAuth()
    // const [showPass, setShowPass] = useState(false);
    //const [password, setPassword] = useState('');
    // const [isPasswordOkay, set_isPasswordOkay] = useState(false);
    const [edit, setEdit] = useState(false)
    const geoData = useLoaderData()
    // console.log(geoData);
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
        control,
        formState: { errors },
        setValue
    } = useForm()

    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        // console.log(data)
        setSubmitting(true)
        //TODO: resolve division, district, upazila
        const division = geoData.divisions.find(dv => dv.id == data.division).name;
        const district = geoData.districts.find(dv => dv.id == data.district).name;
        const upazila = geoData.upazilas.find(dv => dv.id == data.upazila).name;

        // console.log(division, district, upazila); return;


        // console.log(res)


        const name = data.name
        // const email = data.email
        // const password = data.password
        const bloodGroup = data.bloodGroup;
        // console.log(name, email, photo, password)

        let photoUpload = null;
        if (data.photo.length > 0) {
            const formData = new FormData();
            formData.append("file", data.photo[0])
            try {
                photoUpload = await axios.post("http://localhost:3000/upload", formData)
            } catch (err) {
                err
            }
        }

        const photo = photoUpload?.data?.url || user.photo;

        try {
            const register = await axiosSecure.post('/edit_profile', { name, photo, bloodGroup, division, district, upazila })
            toast(register.data.message)
            if (register.data.user) {
                setUser({ ...register.data.user })
                navigate(0)
            }
        } catch (err) {
            err;
            toast.error("Profile update failed.")
            setSubmitting(false)
        }

        setSubmitting(false)


        // signUpWithPassword(email, password)
        //     .then(async () => {
        //         let photoUpload = null;

        //         try {
        //             photoUpload = await axios.post("http://localhost:3000/upload", formData)
        //         } catch (err) {
        //             err
        //         }


        //         //if (photoUpload?.data?.url) {
        //         const photo = photoUpload?.data?.url || import.meta.env.VITE_USER_DEFAULT_IMAGE;
        //         updateProfile(auth.currentUser, {
        //             displayName: name,
        //             photoURL: photo
        //         })
        //             .then(() => {
        //                 setSubmitting(false)
        //                 toast("Register success. Profile updated")
        //                 setUser({ ...auth.currentUser })
        //                 navigate(next)
        //             })
        //             .catch(err => {
        //                 setSubmitting(false)
        //                 toast(getFirebaseErrorMessage(err));
        //                 navigate(next)
        //             });
        //         // } else {
        //         //     toast("Profile image update failed, update profile after login.")
        //         //     setSubmitting(false)
        //         //     navigate(next)
        //         // }
        //     })
        //     .catch(err => {
        //         setSubmitting(false)
        //         toast(getFirebaseErrorMessage(err));
        //     })

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
    // const confirm_password = useWatch({ control, name: "confirm_password" });
    // const passwordError = CheckPassword({ password: password ?? '' })

    const division = useWatch({ control, name: "division" });
    const district = useWatch({ control, name: "district" });
    // const upazila = useWatch({ control, name: "upazila" });

    const user_division = geoData.divisions.find(dv => dv.name == user.division).id;
    const user_district = geoData.districts.find(dv => dv.name == user.district).id;
    const user_upazila = geoData.upazilas.find(dv => dv.name == user.upazila).id;

    useEffect(() => {
        setValue('division', user_division, { shouldWatch: true });
        setValue('district', user_district, { shouldWatch: true });
        setValue('upazila', user_upazila, { shouldWatch: true });
    }, [division, district, user_division, user_district, user_upazila]);

    return (
        <div className="min-h-[80vh] max-[800px]:min-h-[100vw] p-4 my-10 flex flex-col items-center justify-center ">
            {/* <Title value={`${AppName} - Register`}></Title> */}
            <div className="container px-0! max-w-155!  bg-base-100 shadow-2xl rounded-3xl flex flex-col items-center justify-center overflow-hidden">
                <h2 className='font-bold mb-5 text-center text-white bg-blue-300 w-full p-4'>Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-2 w-9/10 md:w-8/10'>
                    <div className='text-right'>
                        {!edit && <button type='button' className="btn btn-primary" onClick={() => setEdit(!edit)}>Edit</button>}
                    </div>
                    <h3 className='text-primary mb-0'>Name:</h3>
                    <input type="text" {...register("name", { required: 'Name is required' })} className='input md:input-lg w-full' placeholder='Enter your full name' defaultValue={user.name} disabled={!edit} />

                    {errors.name && <p className="error">{errors.name.message}</p>}

                    <h3 className='text-primary mb-0'>Email:</h3>
                    <input type="email" {...register("email", { required: 'Email is required' })} className='input md:input-lg w-full' placeholder='Enter your email address' defaultValue={user.email} disabled={true} />

                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <h3 className='text-primary mb-0'>Profile Picture:</h3>
                    <img src={user.photo} />
                    {edit && <input type="file" {...register("photo", {  })} className="file-input md:file-input-lg w-full" />}

                    {errors.photo && <p className="error">{errors.photo.message}</p>}


                    <h3 className='text-primary mb-0'>Blood Group:</h3>
                    <select
                        className="select select-bordered w-full"
                        {...register("bloodGroup", { required: 'Blood group is required' })}
                        // value={blood}
                        // onChange={e => setBlood(e.target.value)}
                        defaultValue={user.bloodGroup}
                        disabled={!edit}
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>

                    {errors.bloodGroup && <p className="error">{errors.bloodGroup.message}</p>}


                    <h3 className='text-primary mb-0'>Division:</h3>
                    <select
                        className="select select-bordered w-full"
                        {...register("division", { required: 'Division is required' })}
                        disabled={!edit}
                    >
                        <option value="">Select Division</option>
                        {geoData.divisions.map(dv => (
                            <option key={dv.id} value={dv.id}>{dv.name}</option>
                        ))}
                    </select>

                    {errors.division && <p className="error">{errors.division.message}</p>}


                    <h3 className='text-primary mb-0'>District:</h3>
                    <select
                        className="select select-bordered w-full"
                        {...register("district", { required: 'District is required' })}
                        disabled={!edit}
                    >
                        <option value="">Select District</option>
                        {division && geoData.districts.map(dv => {
                            if (dv.division_id != division) return null;
                            return <option key={dv.id} value={dv.id}>{dv.name}</option>
                        })}
                    </select>

                    {errors.district && <p className="error">{errors.district.message}</p>}

                    <h3 className='text-primary mb-0'>Upazila:</h3>
                    <select
                        className="select select-bordered w-full"
                        {...register("upazila", { required: 'Upazila is required' })}
                        disabled={!edit}
                    >
                        <option value="">Select Upazila</option>
                        {district && geoData.upazilas.map(dv => {
                            if (dv.district_id != district) return null;
                            return <option key={dv.id} value={dv.id}>{dv.name}</option>
                        })}
                    </select>

                    {errors.upazila && <p className="error">{errors.upazila.message}</p>}


                    {/* <input  type="submit" value="Register" className='btn btn-primary w-full' /> */}
                    {edit && <button disabled={isSubmitting} className='btn btn-primary md:btn-lg w-full'>Edit</button>}

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

export default ProfilePage;