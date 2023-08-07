import User from "../Model/User.js";   /// here we import User Schema 
import bcrypt from 'bcryptjs';

//// here we define Controllers for all function   

  export const getAllUsers = async (req, res, next)=>{
    let users ;
    try{
        users  = await User.find(); /// we define an array of users so that has been in User Schema 
        /// and it will give all values because we did not put any find();
    }catch(err){
        console.log(err)
    }

    /// if we did not have any users so then we
    if(!users){
        return res.status(404).json({message : "did not find  any user "})
    }

    return res.status(200).json({users})

}

export const SignUp = async (req, res, next)=>{
    let {name , email , password } = req.body;
////////// to check existing user 
    let exsistingUser;
    try{
      exsistingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }

    if(exsistingUser){
        return res.status(400).json({message : `${email} user already existed `})
    }

    //// for new user 
const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name , email, password:hashedPassword
    });

    try{
        user.save()
    }catch(err){
        console.log(err)
    }

    return res.status(201).json({user})
}




export const login = async(req, res , next)=>{
     let { email , password } = req.body;
////////// to check existing user 
    let exsistingUser;
    try{
      exsistingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }

    if(!exsistingUser){
        return res.status(404).json({message : `${email} user does not exist  `})
    }

////////// password checking 

const isPasswordCorrect = bcrypt.compareSync(password, exsistingUser.password)

  if(!isPasswordCorrect){
        return res.status(404).json({message : `Please enter valid credentials `})
    }
    return res.status(200).json({message:"login Successful"})


}