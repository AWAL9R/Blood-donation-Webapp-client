import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link, useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useAuth } from '../../hooks/useAuth';



const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
    const geoData = useLoaderData()

    const {user}=useAuth()
    // console.log(user);

    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        // watch,
        control,
        formState: { errors },
    } = useForm()

    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        // console.log(data)
        setSubmitting(true)
        //TODO: resolve division, district, upazila
        const division = geoData.divisions.find(dv => dv.id == data.division).name;
        const district = geoData.districts.find(dv => dv.id == data.district).name;
        const upazila = geoData.upazilas.find(dv => dv.id == data.upazila).name;
        data.division=division;
        data.district=district;
        data.upazila=upazila;

        // console.log(division, district, upazila); return;

        
        try {
            const register = await axiosSecure.post('/create_donation_request', { ...data })
            toast(register.data.message)
            //if (register.data.user) {
                // setUser({ ...register.data.user })
                // navigate(next)
           // }
        } catch (err) {
            toast.error("Request Creation failed.")
            setSubmitting(false)
        }

        setSubmitting(false)

    }

    const division = useWatch({ control, name: "division" });
    const district = useWatch({ control, name: "district" });
    // const upazila = useWatch({ control, name: "upazila" });


    return (
        <div className="min-h-[80vh] max-[800px]:min-h-[100vw] p-4 my-10 flex flex-col items-center justify-center ">
            {/* <Title value={`${AppName} - Register`}></Title> */}
            <div className="max-w-155! text-center">
                <h2>Create a Donation Request</h2>
            </div>
            <div className="container px-0! max-w-155!  bg-base-100 shadow-2xl rounded-3xl flex flex-col items-center justify-center overflow-hidden">
                <h2 className='font-bold mb-5 text-center text-white bg-blue-300 w-full p-4'>Request Form</h2>
                {user.status!='active' && <h3 className='bg-red-300'>You can not create any Request</h3>}
                <form onSubmit={handleSubmit(onSubmit)} className={user.status!='active'?"hidden":`flex flex-col gap-5 p-2 w-9/10 md:w-8/10`}>

                    <h3 className='text-primary mb-0'>Requester Name:</h3>
                    <input type="text" disabled={true} {...register("requester_name", { required: 'Name is required' })} className='input md:input-lg w-full' placeholder='Enter your full name' value={user.displayName||user.name}/>

                    {errors.requester_name && <p className="error">{errors.requester_name.message}</p>}

                    <h3 className='text-primary mb-0'>Requester Email:</h3>
                    <input type="email"  disabled={true} {...register("requester_email", { required: 'Email is required' })} className='input md:input-lg w-full' placeholder='Enter your email address' value={user.email} />

                    {errors.requester_email && <p className="error">{errors.requester_email.message}</p>}


                    <h3 className='text-primary mb-0'>Receiver Name:</h3>
                    <input type="text" {...register("receiver_name", { required: 'Receiver Name is required' })} className='input md:input-lg w-full' placeholder='Enter Receiver name' />

                    {errors.receiver_name && <p className="error">{errors.receiver_name.message}</p>}


                    <h3 className='text-primary mb-0'>Blood Group:</h3>
                    <select
                        className="select select-bordered w-full"
                        {...register("bloodGroup", { required: 'Blood group is required' })}
                    // value={blood}
                    // onChange={e => setBlood(e.target.value)}
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
                    >
                        <option value="">Select Upazila</option>
                        {district && geoData.upazilas.map(dv => {
                            if (dv.district_id != district) return null;
                            return <option key={dv.id} value={dv.id}>{dv.name}</option>
                        })}
                    </select>

                    {errors.upazila && <p className="error">{errors.upazila.message}</p>}


                    <h3 className='text-primary mb-0'>Hospital Name:</h3>
                    <input type="text" {...register("hospital_name", { required: 'Hospital Name is required' })} className='input md:input-lg w-full' placeholder='Enter Hospital name' />

                    {errors.hospital_name && <p className="error">{errors.hospital_name.message}</p>}


                    <h3 className='text-primary mb-0'>Full Address:</h3>
                    <input type="text" {...register("full_address", { required: 'Full Address is required' })} className='input md:input-lg w-full' placeholder='Enter full Address' />

                    {errors.full_address && <p className="error">{errors.full_address.message}</p>}


                    <h3 className='text-primary mb-0'>Donation Date:</h3>
                    <input type="date" {...register("donation_date", { required: 'Donation Date is required' })} className='input md:input-lg w-full' placeholder='Select Donation date' />

                    {errors.donation_date && <p className="error">{errors.donation_date.message}</p>}


                    <h3 className='text-primary mb-0'>Donation Time:</h3>
                    <input type="time" {...register("donation_time", { required: 'Donation Time is required' })} className='input md:input-lg w-full' placeholder='Select donation time' />

                    {errors.donation_time && <p className="error">{errors.donation_time.message}</p>}


                    <h3 className='text-primary mb-0'>Request Message:</h3>
                    <textarea type="text" {...register("request_message", { required: 'Request Message is required' })} className='textarea md:textarea-lg w-full' placeholder='Request Message. e.g. why blood is needed.' rows='4'></textarea>

                    {errors.request_message && <p className="error">{errors.request_message.message}</p>}

                    




                    <button disabled={isSubmitting} className='btn btn-primary md:btn-lg w-full'>Submit Request</button>



                    <div className="h-4"></div>

                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;