import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersChats from './pages/UserChats'
// import Chat from './pages/VetChat/Chat'

const Vetinary = () => {

  const location = useLocation();
  // Hide footer on specific routes
  const hideFooterRoutes = ['/chats','/login'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  
  return (
    <div id='header' className="relative mx-4 sm:mx-[10%] min-h-screen" >
     
       { <div className="hidden sm:block fixed top-[-50px] left-[-100px] w-40 h-26 bg-gradient-to-br from-yellow-400 to-orange-500 z-[-1] rotate-[19deg] skew-x-[1deg] rounded-[40%]"></div>}
       { shouldShowFooter && <div className="hidden sm:block fixed top-60 right-[-150px] w-46 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 z-[-1] rotate-[19deg] skew-x-[3deg] rounded-[40%]"></div>}
       { shouldShowFooter && <div className="hidden sm:block fixed bottom-55 left-[-49px] w-20 h-25 bg-gradient-to-br from-yellow-400 to-orange-500 z-[-1] rotate-[20deg] skew-x-[8deg] rounded-[40%]"></div>}
       { shouldShowFooter && <div className="hidden sm:block fixed bottom-[-50px] right-[-100px] w-52 h-30 bg-gradient-to-br from-yellow-400 to-orange-500 z-[-1] rotate-[10deg] skew-x-[-20deg] rounded-[40%]"></div>}
       { shouldShowFooter && <div className="hidden sm:block fixed bottom-[-38px] left-[-100px] w-36 h-22 bg-gradient-to-br from-yellow-400 to-orange-500 z-[-1] rotate-[19deg] skew-x-[1deg] rounded-[40%]"></div>}
       { <div className="hidden sm:block fixed top-[-50px] right-[-100px] w-42 h-30 bg-gradient-to-br from-yellow-400 to-orange-500 z-[-1] rotate-[80deg] skew-x-[-20deg] rounded-[40%]"></div>}
      <ToastContainer/>
      { <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vets' element={<Doctors />} />
        <Route path='/vets/:speciality' element={<Doctors />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />}/>
        <Route path='/verify' element={<Verify />} />
        <Route path="/chats" element={<UsersChats />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  )
}

export default Vetinary
