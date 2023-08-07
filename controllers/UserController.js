import User from "../Model/User.js";   /// here we import User Schema 


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

    const user = new User({
        name , email, password
    });

    try{
        user.save()
    }catch(err){
        console.log(err)
    }

    return res.status(201).json({user})
}