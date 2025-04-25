import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken,userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='lg:rounded-full flex items-center justify-between text-sm py-5 px-4 md:px-10 mt-1 mb-5 border border-gray-200 sticky top-0 bg-white/70 z-50 backdrop-blur-2xl lg:shadow-lg'>
      {/* Logo */}
      <a href='#header'>
        <img onClick={() => navigate('/')} className='w-56 cursor-pointer' src={assets.VetLogo} alt="VetLogo" />
      </a>
      {/* Desktop Nav */}
      <ul className='hidden md:flex items-center gap-10 font-medium text-lg'>
        {['/', '/vets', '/chats', '/about', '/contact'].map((path, index) => (
          <NavLink key={index} to={path} className="group relative">
            <li className='py-1'>{path === '/' ? 'HOME' : path.slice(1).toUpperCase()}</li>
            <hr className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-none h-1 w-0 bg-orange-600 rounded-full transition-all duration-300 ease-in-out opacity-0 group-hover:w-4/5 group-hover:opacity-100" />
          </NavLink>
        ))}
      </ul>

      {/* User Profile / Login Button */}
      {token && userData ? 
      (<div className='flex items-center gap-2 cursor-pointer group relative'>
          <img className='w-8 rounded-full' src={userData.image} alt="Profile" />
          <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 text-gray-400'>
                  <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-profile')}>My Profile </p><hr className="border-b-0 border-gray-200" />
                  <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-appointments')}>My Appointments</p><hr className="border-b-0 border-gray-200" />
                  <p className='hover:text-red-600 cursor-pointer' onClick={logout}>Logout</p>
                </div>
              </div>
        </div>
      ) : (
        <button
  onClick={() => navigate('/login')}
  className="bg-blue-600 text-white font-light rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 hover:drop-shadow-md
             text-sm md:text-lg px-4 md:px-8 py-1 md:py-3 mx-2 md:mx-0">
  Create account
</button>


      )}

      {/* Mobile Menu Button */}
      <button className='md:hidden text-3xl' onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? '✖' : '☰'}
      </button>

      {/* Mobile Nav Menu */}
      {showMenu && (
        <ul className='absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-4 transition-all duration-300 md:hidden'>
          {['/', '/vets', '/chats', '/about', '/contact'].map((path, index) => (
            <NavLink key={index} to={path} className="w-full text-center py-2 border-b border-gray-300" onClick={() => setShowMenu(!showMenu)}>
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()} 
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
