const { default: mongoose } = require("mongoose");
const { default: dbConnect } = require("./dbConnect");

dbConnect();
const followerSchema = new mongoose.Schema({
    followedById:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , 'Please enter follower-id'],
    },
    followedByName:{
        type:String,
        require:[true , "Please enter the follower-name"]
    },
    followedToId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "Please enter the user-id"]
    },
    followedToName:{
        type:String,
        require:[true , "Please enter the user-name"]
    },
});


export default mongoose.models.Follower || mongoose.model("Follower" , followerSchema);