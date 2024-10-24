import express from "express";
import { addBlog , blogList , removeBlog } from "../controller/blogController.js";
import multer from 'multer'


const blogRouter = express.Router();


// Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => {
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


blogRouter.post('/add', upload.single("image") , addBlog);

blogRouter.get('/list' , blogList)

blogRouter.post('/remove' , removeBlog)




export default blogRouter;