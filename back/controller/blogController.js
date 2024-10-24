import blogModel from "../models/blogModel.js";
import fs from 'fs';


// add Blog item
// const addBlog = async (req, res) => {
//   let image_filename = `${req.file.filename}`;

//   const blog = new blogModel({
//     title: req.body.title,
//     description: req.body.description,
//     image: image_filename,
//     category: req.body.category,
//   });

//   try {
//     await blog.save();
//     res.json({ success: true, message: "Blog Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

const addBlog = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const blog = new blogModel({
    title: req.body.title,            // Title of the blog
    shortDesc: req.body.shortDesc,    // Short description of the blog
    description: req.body.description,// Full description of the blog
    image: image_filename,            // Image file
    category: req.body.category,      // Blog category
    hashtags: req.body.hashtags,      // Hashtags (array of strings)
    nameOfTheBlogger: req.body.nameOfTheBlogger // Name of the blogger
    // createdAt will be automatically set by Mongoose's default value
  });

  try {
    await blog.save();
    res.json({ success: true, message: "Blog Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding blog" });
  }
};



// all BLog list
const blogList = async (req, res) => {
    try {
      const blogs = await blogModel.find({});
      res.json({ success: true, data: blogs });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };


  // remove blog item

const removeBlog = async (req, res) => {
    try {
      const blog = await blogModel.findById(req.body.id);
      fs.unlink(`uploads/${blog.image}`, () => {});
  
      await blogModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Blog Removed" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };


  export {addBlog , blogList , removeBlog};