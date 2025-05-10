import express from 'express';
import { appointmentCancel, appointmentComplete, appointmentsVet, changeAvailablity, loginVet, updateVetProfile, vetDashboard, vetList, vetProfile } from '../controllers/vetController.js';
import authVet from '../middlewares/authVet.js';

const vetRouter = express.Router();

vetRouter.post("/login", loginVet)
vetRouter.post("/cancel-appointment", authVet, appointmentCancel)
vetRouter.get("/appointments", authVet, appointmentsVet)
vetRouter.get("/list", vetList)
vetRouter.post("/change-availability", authVet, changeAvailablity)
vetRouter.post("/complete-appointment", authVet, appointmentComplete)
vetRouter.get("/dashboard", authVet, vetDashboard)
vetRouter.get("/profile", authVet, vetProfile)
vetRouter.post("/update-profile", authVet, updateVetProfile)

export default vetRouter;