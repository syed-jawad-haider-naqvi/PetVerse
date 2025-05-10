import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from "react";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
    const [doctorChats, setDoctorChats] = useState([]);


    // Getting Vet appointment data from Database using API
    const getAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/vet/appointments', { headers: { dToken } })

            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting Vet profile data from Database using API
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/vet/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel vet appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/vet/cancel-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // after creating dashboard
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to Mark appointment completed using API
    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/vet/complete-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Vet dashboard data using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/vet/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
    // Fetch vet's chats
    const getDoctorChats = async () => {
        if (!profileData?._id) {
            console.log("Vet ID is missing");
            return;
        }
    
        try {
            const { data } = await axios.get(`${backendUrl}/api/chat?docId=${profileData._id}`, {
                headers: { dToken }
            });
    
            console.log("Vet chats fetched:", data);
            setDoctorChats(data);
        } catch (error) {
            console.error("Error fetching Vet chats:", error.response?.data || error.message);
        }
    };
    

    const value = {
        dToken, setDToken, backendUrl,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
        getDoctorChats, doctorChats,
        setDoctorChats
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )


}

export default DoctorContextProvider