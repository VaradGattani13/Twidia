import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


//Register User
// CALL IN MONGO DB->promise

export const register=async(req,res)=>{
try{
    const{
        firstName,lastName,email,password,picturePath,
        friends,location,occupation

    }=req.body;
     salt=await bcrypt.genSalt();
     const passwordHash=await bcrypt.hash(password,salt);
     const newUser=new User({
        firstName,
    lastName,email,
    password:passwordHash,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile:Math.floor(Math.random()*10000),
    impressions:Math.floor(Math.random()*10000)

     });
     const savedUser=await newUser.save();
     res.status(201).json(savedUser);




}catch(err){
    res.status(500).json({error:err.message});


}
}




// Logging IN
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user)
        return res.status(400).json({msg:"User Does nOT EXIST"}); 
        const isMatch=await bcrypt.compare(password,user.passsword);
        if(!isMatch)  return res.status(400).json({msg:"Wrong Password"});
        const token=jwt.sign({id:user._id},process.env.JWT_KEY);
        delete user.passsword;
        res.status(200).json({token,user});
        

  }catch(e){
    res.status(500).json({err:e.message});

  }

}
