import React,{useContext} from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddVet from './pages/Admin/AddVet';
import Login from './pages/Login';
import VetsList from './pages/Admin/VetsList';
import VetAppointments from './pages/Vet/VetAppointments';
import VetDashboard from './pages/Vet/VetDashboard';
import VetProfile from './pages/Vet/VetProfile';
import VetChats from './pages/Vet/VetChats';
// import VetChat from './pages/Vet/VetChat'

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

   return  aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar /> 
       <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/add-vet' element={<AddVet />} />
          <Route path='/vet-list' element={<VetsList />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          {/* Vet Routes */}
          <Route path='/' element={<></>} />
          <Route path='/vet-dashboard' element={<VetDashboard/>} />
          <Route path='/vet-appointments' element={<VetAppointments />} />
          <Route path='/vet-profile' element={<VetProfile />} />
          <Route path="/chats" element={<VetChats />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App