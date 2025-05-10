import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken') && localStorage.removeItem('aTokenExpiry')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-gradient-to-r from-white via-gray-50 to-gray-100'>
      <div className='flex items-center gap-2 text-xs'>
        <img onClick={() => navigate('/')} className='lg:w-42 md:w-30 sm:w-20 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Vet'}</p>
      </div>
      <button onClick={() => logout()} className='bg-blue-600 text-white text-sm ml-20 px-10 py-2 rounded-full cursor-pointer hover:bg-blue-50 hover:text-blue-900 hover:border-2'>Logout</button>
    </div>
  )
}

export default Navbar