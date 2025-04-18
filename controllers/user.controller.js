import User from "../models/user.model.js";

export const getUsers = async(req,res)=>{
  try{
    const users=await User.find({});
    if(users.length){
      return res.status(200).json({success:true,data:users});
    }
    // return res.status(400).json({success : false})
  }catch(error){
    return res.status(400).json({success : false})
  }
}

export const getUser = async(req,res,next)=>{
  try{
    const user=await User.findById(req.params.id).select('-password');
    res.status(200).json({success:true,data:user});
  }catch(error){
    next(error);
  }
}
  