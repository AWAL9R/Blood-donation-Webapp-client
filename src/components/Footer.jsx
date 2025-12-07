import React from 'react';
import { Link } from 'react-router';

import logoImg from '../assets/icon-sm.png'
import { APP_NAME } from '../settings';
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div className="shadow-[0_-2px_3px_-1px_rgba(0,0,0,0.1),0_-1px_2px_-2px_rgba(0,0,0,0.06)] mt-3 bg-primary-content p-4">
            <div className="container">
                <div className="flex justify-between flex-wrap pt-4 gap-4">
                    <div className='w-150'>
                        <div className='mb-3'>
                            <Link to='/' className='flex items-stretch gap-1'>
                                <img src={logoImg} alt="icon" className='h-9' />
                                <div className='font-bold pt-1'>
                                    <span className='text-2xl text-red-700'>Blood</span><span className='text-2xl text-blue-700'>Link</span>
                                </div>
                            </Link>
                        </div>
                        <p className='text-justify'>
                            {APP_NAME} is more than a platform. it is a life-saving bridge between those in urgent need and the heroes willing to give. With just a few clicks, {APP_NAME} connects donors and recipients in real time, making emergency blood donation faster, smarter, and more reliable. Every drop shared through {APP_NAME} carries hope, strength, and a second chance at life.

                        </p>
                        <div className="mt-4 flex gap-1 text-3xl text-white *:border-gray-200 *:border *:p-2 *:bg-gray-700 *:rounded-full">
                            <a href={`https://twitter.com/@${APP_NAME}`}><FaXTwitter /></a>
                            <a href={`https://facebook.com/@${APP_NAME}`}><FaFacebook /></a>
                            <a href={`https://linkedin.com/@${APP_NAME}`}><FaLinkedin /></a>
                            <a href={`https://github.com/@${APP_NAME}`}><FaGithub/> </a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3>Services</h3>
                        <Link>Products & Services</Link>
                        <Link>Customer Stories</Link>
                        <Link>Download Apps</Link>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3>Information</h3>
                        <Link>Privacy Policy</Link>
                        <Link>Terms & Conditions</Link>
                        <Link>Join Us</Link>
                    </div>
                    
                </div>
                <div className="border-t border-t-gray-300 p-4 mt-4 text-center">
                    Copyright © 2025 - All right reserved
                </div>
            </div>
        </div>
    );
};

export default Footer;