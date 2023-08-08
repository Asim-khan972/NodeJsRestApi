import mongoose from 'mongoose'; 

import Blogs from "../Model/Blog.js";   /// here we import User Schema 
import User from "../Model/User.js";

//// here we define Controllers for all function   

  export const getAllBlogs = async (req, res, next)=>{
    let blogs;
    try{
        blogs   = await Blogs.find(); 
    }catch(err){
        console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message : "did not find  any blog "})
    }

    return res.status(200).json({blogs})

}

///////////  add new blog 
export const addBlog = async (req, res, next)=>{
    const {title , description , image , user} = req.body;

      let exsistingUser;
    try{
      exsistingUser = await User.findById(user);
    }catch(err){
        console.log(err)
    }

    if(!exsistingUser){
        return res.status(400).json({message : `${email} user does not existed existed `})
    }


    const blog = new Blogs({
        title, description, image , user 
    })


    try{

    const session = await mongoose.startSession();
    session.startTransaction();
     await  blog.save({session});
     exsistingUser.blogs.push(blog);
    await blog.save({session});
    await session.commitTransaction();

    }catch(err){
         console.log(err)
             return res.status(200).json({blog})
    }

    return res.status(500).json({message:err})

}

 ////////// update blog 

export const updateBlog = async(req, res, next)=>{
    const blogId = req.params.id;
    const {title, description}= req.body;

    let blog ;
    try{
        blog = await  Blogs.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        console.log(err)
    }
     if(!blog){
        return res.status(404).json({message : "unable to  find  any blog "})
    }
        return res.status(200).json({blog})

}

/////////////  get a single blog 


export const getByid = async(req, res, next)=>{
    let Id = req.params.id;
    let blog;
    try{
        blog = await Blogs.findById(Id)
    }catch(err){
       return console.log(err)
    }
     if(!blog){
        return res.status(404).json({message : "unable to  find  any blog "})
    }
        return res.status(200).json({blog})


}


////////////// delete 

export const deleteBlog =  async(req, res, next)=>{
    let id = req.params.id;
    let blog ;
    try{
        blog = await Blogs.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog)
        await blog.user.save();
    }catch(err){
       return console.log(err)
    }

   if(!blog){
        return res.status(404).json({message : "unable to  find  any blog "})
    }
        return res.status(200).json({message : `delete the blog successfully `})

    
}

export const getByUserId =  async(req, res, next)=>{
    const userId = req.params.id;
    let userBlogs ;

    try{
        userBlogs = await User.findById(userId).populate("blog");

    }catch(err){
       return console.log(err)
    }

   if(!userBlogs){
        return res.status(404).json({message : "unable to  find  any blog "})
    }
        return res.status(200).json({blogs: userBlogs})



}