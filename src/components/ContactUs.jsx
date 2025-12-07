import React from 'react';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';

const ContactUs = () => {
    return (
        <div className="my-10 p-4">
            <div className='flex flex-col-reverse lg:grid lg:grid-cols-2 container rounded-xl shadow-xl overflow-hidden '>
                <div className='bg-gray-200 py-4  px-5 flex items-center'>
                    <div>
                        <h4 className='flex gap-2 items-center'><BiSolidPhoneCall />Phone</h4>
                        <p className='text-gray-600 mb-3'>+88 01842-630991</p>

                        <h4 className='flex gap-2 items-center'><IoLocationSharp />Address</h4>
                        <p className='text-gray-600 mb-3'>House 9, Road 11, Sector 4, Uttara, Dhaka</p>

                        <h4 className='flex gap-2 items-center'><FaClock />Working Hours</h4>
                        <p className='text-gray-600 mb-3'>Sun-Thu, 10AM-5PM</p>
                    </div>
                </div>
                <div className='bg-linear-to-tr from-red-300 to-blue-200 p-4'>
                    <form action="" className='flex flex-col items-center gap-3'>
                        <h3>CONTACT US</h3>
                        <input type="text" className="input" placeholder='Enter your name' />
                        <input type="text" className="input" placeholder='Enter your email address' />
                        <textarea cols='50' rows={5} className="textarea" placeholder='Write your message...'></textarea>
                        <button type='button' className="btn my-btn w-2/6">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;