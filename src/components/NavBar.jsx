import React, { useState } from 'react';

import logoImg from '../assets/icon-sm.png'
import { Link, NavLink } from 'react-router';
import { TfiMenuAlt } from 'react-icons/tfi';
import { RxCross2 } from 'react-icons/rx';

const NavBar = () => {
    let user = {
        uid: 100,
        name: "Abdul Awal",
        image: '/person.png',
        email: 'awal9r@gmail.com',
    };
    //user = null;
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav>
            <div className='max-[600px]:fixed bg-white w-full'>
                <div className='shadow-sm '>
                    <div className='container h-16  flex justify-between items-stretch select-none'>
                        <div className='flex items-center gap-3'>
                            {/* Logo */}
                            <Link to='/' className='flex items-stretch gap-1'>
                                <img src={logoImg} alt="icon" className='h-9' />
                                <div className='font-bold pt-1'>
                                    <span className='text-2xl text-red-700'>Blood</span><span className='text-2xl text-blue-700'>Link</span>
                                </div>
                            </Link>
                            {/* Links */}

                            <div className="flex items-streach h-full gap-3 max-[600px]:w-0 overflow-hidden inline_nav">
                                <NavLink to='/' className=''>Dashboard</NavLink>
                                <NavLink to='/signup' className=''>Signup</NavLink>
                            </div>

                        </div>
                        <div className='flex items-center'>

                            {
                                user?.email ? <div className="dropdown dropdown-bottom dropdown-end max-[600px]:hidden">
                                    <div tabIndex={0} role="button" className="select-none">
                                        <img src={user?.image} alt="profile image" className='h-14 rounded-full aspect-square' />
                                    </div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li><Link to='/dashboard'>Dashboard</Link></li>
                                        <li><Link>Logout</Link></li>
                                    </ul>
                                </div>
                                    :
                                    <div className="max-[600px]:hidden"><button className="btn btn-primary">Login</button></div>
                            }

                            <div className="hidden max-[600px]:block text-3xl hover:scale-103">
                                {showMenu ? <RxCross2 onClick={() => setShowMenu(!showMenu)}></RxCross2> : <TfiMenuAlt onClick={() => setShowMenu(!showMenu)}></TfiMenuAlt>}
                            </div>


                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div className={`transition-all duration-500 overflow-hidden max-h-0 ${showMenu ? 'max-[600px]:max-h-1000' : 'max-[600px]:max-h-0'}`}>
                        <div className='block_nav mx-4'>
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                            <NavLink to='/profile'>Profile</NavLink>
                            <div className="border-t border-t-gray-300 py-3">
                                <div className='flex gap-2 items-stretch'>
                                    <img src={user?.image} alt="" className='w-15 aspect-square rounded-full' />
                                    <div>
                                        <div className='text-xl font-semibold'>{user?.name}</div>
                                        <div>{user?.email}</div>
                                    </div>
                                </div>
                                <NavLink to='/dashboard'>Dashboard</NavLink>
                                <NavLink to='/logout'>Logout</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-0 w-full max-[600px]:h-17'></div>
        </nav>
    );
};

export default NavBar;