import axios from 'axios'
import React, { useContext, useState } from 'react'
import '../index.css'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        const expiryTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
        localStorage.setItem('aToken', data.token);
        localStorage.setItem('aTokenExpiry', expiryTime); // Store expiry time
        setAToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {
      const { data } = await axios.post(backendUrl + '/api/vet/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }


  return (
    <div className='min-h-[100vh] bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-500 animate-gradient'>
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className=' bg-white bg-blend-color-burn flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-blue-600'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='bg-blue-600 text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
        {
          state === 'Admin'
            ? <p>Vet Login? <span onClick={() => setState('Vet')} className='text-blue-600 underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-blue-600 underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
    </div>
  )
}

export default Login