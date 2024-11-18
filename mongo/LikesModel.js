import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const likesSchema = new mongoose.Schema(
    {
        likedToId: { 
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "likedToModel",
        },
        likedToModel: {
            type: String,
            required: true,
            enum: ["Users", "Blogs"], 
        },
        likedById: { 
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        likedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

likesSchema.index({ likedToId: 1, likedToModel: 1, likedById: 1 }, { unique: true });

export const Likes = mongoose.models.Likes || mongoose.model("Likes", likesSchema);
