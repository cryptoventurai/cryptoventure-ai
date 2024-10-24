import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    shortDesc:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{ 
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    hashtags: {
        type: [String], // Array of strings to store multiple hashtags
        default: [], // Default to an empty array if no hashtags are provided
    },
    nameOfTheBlogger:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date, 
        default: Date.now, // Automatically sets the current time when a blog post is created
    }
})

const blogModel = mongoose.models.food || mongoose.model("blog" , blogSchema);

export default blogModel;