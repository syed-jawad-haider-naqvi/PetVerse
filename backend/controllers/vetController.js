import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import vetModel from "../models/vetModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API for vet Login 
const loginVet = async (req, res) => {

    try {

        const { email, password } = req.body
        const vet = await vetModel.findOne({ email })

        if (!vet) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, vet.password)

        if (isMatch) {
            const token = jwt.sign({ id: vet._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get vet appointments for vet panel
const appointmentsVet = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for vet panel
const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for vet panel
const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all vets list for Frontend
const vetList = async (req, res) => {
    try {

        const vets = await vetModel.find({}).select(['-password', '-email'])
        res.json({ success: true, vets })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change vet availablity for Admin and Vet Panel
const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await vetModel.findById(docId)
        await vetModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get vet profile for  Vet Panel
const vetProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await vetModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update vet profile data from  Vet Panel
const updateVetProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await vetModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for vet panel
const vetDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginVet,
    appointmentsVet,
    appointmentCancel,
    vetList,
    changeAvailablity,
    appointmentComplete,
    vetDashboard,
    vetProfile,
    updateVetProfile
}