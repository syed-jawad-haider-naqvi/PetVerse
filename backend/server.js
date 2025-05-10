import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import vetRouter from "./routes/vetRoute.js"
import userRouter from "./routes/userRoute.js"
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Update Express limits for larger payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// middlewares
app.use(express.json())
app.use(cors(
  // {
  // origin:'*',
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type','Authorization']
// }
))


//api endpoints
app.use("/api/admin", adminRouter)
app.use("/api/vet", vetRouter)
app.use("/api/user", userRouter)
app.use('/api/chat', ChatRoute)
app.use('/api/message', MessageRoute)

//endpoint for testing
app.get("/", (req, res) => {
    res.send("API WORKING")
  });

app.listen(
  port,
// '0.0.0.0',
() => console.log(`Server started on PORT:${port}`))