import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connection Successful!"))
    await mongoose.connect(`${process.env.MONGODB_URI}/petversevets`)

}

export default connectDB;