import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'username is required'],
    trim:true,
    minLength:2,
    maxLength:50,
  },
  email:{
    type:String,
    required:[true,'E-mail is required'],
    unique:true,
    trim:true,
    lowercase:true,
    minLength:5,
    maxLength:50,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password:{
    type:String,
    required:[true,'password is required'],
    minLength:4,
  },
},
  {timestamps:true}
);

const User= mongoose.model('User',userSchema);
export default User;
