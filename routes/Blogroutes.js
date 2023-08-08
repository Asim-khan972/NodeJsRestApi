import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getByUserId, getByid, updateBlog } from '../controllers/BlogController.js';
const Blogrouter = express.Router();

Blogrouter.get("/", getAllBlogs)
Blogrouter.post('/add', addBlog)
Blogrouter.put("/update/:id", updateBlog)
Blogrouter.get('/:id', getByid)
Blogrouter.delete('/:id',deleteBlog)
Blogrouter.get('/user/:id',getByUserId)
 

export default Blogrouter;