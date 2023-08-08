import express from 'express';
import  mongoose  from "mongoose";
import router from './routes/UserRoutes.js';
import Blogrouter from './routes/Blogroutes.js';

var app = express()  //// we can say that express is class and app is object of it 
const port = 3000;



///it has path , callback 
app.use(express.json());

app.use('/api/users', router)
app.use('/api/blog', Blogrouter);



///// 



 mongoose.connect("mongodb://127.0.0.1:27017/restApi")
          .then(() => {
        console.log("Connected to Database "+port);
      })
      .catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
      });


      app.listen(port, ()=>{
        console.log(`listing on port ${port} `)
      })