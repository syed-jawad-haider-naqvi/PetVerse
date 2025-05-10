import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const logout = () => {
        localStorage.removeItem('aToken');
        localStorage.removeItem('aTokenExpiry');
        setAToken('');
        toast.info("Session expired. Please log in again.");
    };
    useEffect(() => {
        const expiryTime = localStorage.getItem('aTokenExpiry');
        if (expiryTime && Date.now() > expiryTime) {
            logout();
        }
    }, []);
    
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appointments, setAppointments] = useState([])
    const [vets, setVets] = useState([])
    const [dashData, setDashData] = useState(false)

    // Getting all Vets data from Database using API
    const getAllVets = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-vets', { headers: { aToken } })
            if (data.success) {
                setVets(data.vets)
                console.log(data.vets)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change vet availablity using API
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllVets()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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

    const value = {
        aToken, setAToken,
        backendUrl,
        vets,
        getAllVets,
        changeAvailability,
        appointments,
        getAllAppointments,
        getDashData,
        cancelAppointment,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider