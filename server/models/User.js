// Mongoose model setup
import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:2,
        max:20
    },
    lastName:{
        type:String,
        require:true,
        min:2,
        max:20
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    passsword:{
        type:String,
        require:true,
        min:8,
      
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impreesions:Number
},{timestamps:true});

const User=mongoose.model('User',UserSchema);
export default User;
