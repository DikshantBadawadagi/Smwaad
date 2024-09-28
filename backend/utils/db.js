<<<<<<< HEAD
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
=======
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
>>>>>>> 6fa5ee436a07f107cb4d29c67bd2626acd18c259
export default connectDB;