import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/pitchmate`,);
        if(conn.connection.readyState === 1) {
            console.log(`Connected to MongoDB ${conn.connection.host}`);
        }
        
        
    } catch (error) {
        console.log("failed to connect : ", error.message);
        process.exit(1);
        
    }
}

export default connectDB