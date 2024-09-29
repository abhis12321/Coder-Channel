import mongoose from "mongoose";
mongoose.set('strictPopulate', false);  // Disable strict populate globally

export default function dbConnect() {
    if(mongoose.connection.readyState >= 1) {
        return ;
    }

    mongoose.connect(process.env.MONGO_URL);
}
