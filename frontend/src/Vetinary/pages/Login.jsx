import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <>
    <div className="hidden sm:block fixed top-[-50px] left-[-100px] w-50 h-46 bg-gradient-to-br bg-white z-[-1] rotate-[19deg] skew-x-[1deg] rounded-[40%]"></div>
    <div className="hidden sm:block fixed bottom-[-395px] left-[-385px] w-190 h-180 bg-gradient-to-br bg-white z-[-1] rotate-[5deg] skew-x-[1deg] rounded-[40%]"></div>
    <div className="hidden sm:block fixed bottom-[-280px] right-[-300px] w-190 h-180 bg-gradient-to-br from-yellow-500 to-orange-500 z-[-1] rotate-[100deg] skew-x-[1deg] rounded-[40%]"></div>
    <div className="hidden sm:block fixed top-[-50px] right-[-100px] w-45 h-30 bg-white z-[-1] rotate-[80deg] skew-x-[-20deg] rounded-[40%]"></div>

    <img className="hidden md:block fixed z-[-1] right-[-80px] bottom-[-25px] w-140" src={assets.cat} alt="" />

    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col sm:m-auto lg:mx-50 gap-3 items-start py-10 px-12 min-w-[340px] sm:min-w-96 border-0 rounded-xl text-[#5E5E5E] bg-white text-md shadow-md shadow-purple-500'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          ? <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : null
        }
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='bg-purple-800 text-white w-full py-2 my-2 rounded-md text-base cursor-pointer'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-blue-700 underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-blue-700 underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
    <div>
      <br />
    </div>
    </>
  )
}

export default Login