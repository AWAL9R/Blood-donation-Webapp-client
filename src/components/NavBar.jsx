import React, { useState } from 'react';

import logoImg from '../assets/icon-sm.png'
import { Link, NavLink } from 'react-router';
import { TfiMenuAlt } from 'react-icons/tfi';
import { RxCross2 } from 'react-icons/rx';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
    // let user = {
    //     uid: 100,
    //     displayName: "Abdul Awal",
    //     photoURL: '/person.png',
    //     email: 'awal9r@gmail.com',
    // };
    // user = null;
    const { user: u, logOut } = useAuth()
    //console.log(user)
    const [showMenu, setShowMenu] = useState(false);

    let user = null;

    if (u != null) {
        user = {
            displayName: u.name,
            photoURL: u.photo,
            ...u
        }
    }
    // console.log(user);

    const mainNavLinks = <>
        <NavLink to='/' className=''>Home</NavLink>
        <NavLink to='/blood-donation-requests' className=''>Donation Requests</NavLink>

        {user == null && <><NavLink to='/signup' className=''>Signup</NavLink></>}
        {user != null && <><NavLink to='/funding' className=''>Funding</NavLink></>}
    </>

    return (
        <nav>
            <div className='max-[600px]:fixed z-999 bg-white w-full'>
                <div className='shadow-sm '>
                    <div className='container p-4 h-16  flex justify-between items-stretch select-none'>
                        <div className='flex items-center gap-3'>
                            {/* Logo */}
                            <Link to='/' className='flex items-stretch gap-1'>
                                <img referrerPolicy="no-referrer" src={logoImg} alt="icon" className='h-9' />
                                <div className='font-bold pt-1 text-3xl '>
                                    <span className='text-red-700'>Blood</span><span className='text-blue-700'>Link</span>
                                </div>
                            </Link>
                            {/* Links */}

                            <div className="flex items-streach h-full gap-3 max-[600px]:w-0 overflow-hidden inline_nav pt-2">
                                {mainNavLinks}

                                 {user!=null && <><NavLink to='/dashboard' className=''>Dashboard</NavLink></>}

                            </div>

                        </div>
                        <div className='flex items-center'>

                            {
                                user?.email ? <div className="dropdown dropdown-bottom dropdown-end max-[600px]:hidden">
                                    <div tabIndex={0} role="button" className="select-none">
                                        <img referrerPolicy="no-referrer" src={user?.photoURL} alt="profile image" className='h-12 rounded-full aspect-square' />
                                    </div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li><Link to='/dashboard'>Dashboard</Link></li>
                                        <li><button onClick={logOut}>Logout</button></li>
                                    </ul>
                                </div>
                                    :
                                    <div className="max-[600px]:hidden"><Link to='/login'><button className="btn btn-primary">Login</button></Link></div>
                            }

                            <div className="hidden max-[600px]:block text-3xl hover:scale-103">
                                {showMenu ? <RxCross2 onClick={() => setShowMenu(!showMenu)}></RxCross2> : <TfiMenuAlt onClick={() => setShowMenu(!showMenu)}></TfiMenuAlt>}
                            </div>


                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div className={`transition-all duration-500 overflow-hidden max-h-0 ${showMenu ? 'max-[600px]:max-h-1000' : 'max-[600px]:max-h-0'}`}>
                        <div className='block_nav mx-4'>
                            {mainNavLinks}
                            {user==null && <NavLink to='/login' className=''>Login</NavLink>}
                            {user != null && <div className="border-t border-t-gray-300 py-3 mt-1">
                                <div className='flex gap-2 items-center mb-2'>
                                    <img referrerPolicy="no-referrer" src={user?.photoURL} alt="" className='w-13 aspect-square rounded-full' />
                                    <div>
                                        <div className='text-xl font-semibold'>{user?.displayName}</div>
                                        <div>{user?.email}</div>
                                    </div>
                                </div>
                                <NavLink to='/dashboard'>Dashboard</NavLink>
                                <Link onClick={logOut}>Logout</Link>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-0 w-full max-[600px]:h-17'></div>
        </nav>
    );
};

export default NavBar;