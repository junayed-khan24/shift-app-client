import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../proFastLogo/ProFastLogo';
import useAuth from '../../../hooks/useAuth';
import { GoArrowUpRight } from 'react-icons/go';

const Navbar = () => {

  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log('signed out user')
      })
      .catch(error => {
        console.log(error)
      })
  }



  const navItems = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/about">About Us</NavLink></li>
  </>

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-md mb-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <a className=" text-xl">
          <ProFastLogo></ProFastLogo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end ">
        {
          user ? <button onClick={handleSignOut} className='btn'>Sign Out</button> :
            <> 
              <div className='flex gap-2'>
                <Link to="/login" className='btn'>Login</Link>
               <Link to="/register" className='btn bg-primary'>Register</Link>
              </div>
               <GoArrowUpRight size={32} className='text-primary bg-black p-1 rounded-full'/>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;