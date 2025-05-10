import express from 'express';
import { addVet,adminDashboard,allVets,appointmentCancel,appointmentsAdmin,loginAdmin } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/vetController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-vet", authAdmin, upload.single('image'), addVet)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-vets", authAdmin, allVets)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;
