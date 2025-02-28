import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

/*register user*/
export const register = async(req,res)=>{
try{
    const{
        firstname,
        lastname,
        email,
        password,
        picturepath,
        freinds,
        location,
        occupation,
    }=req.body;

    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);
    const newuser=new user({
        firstname,
        lastname,
        email,
        password:passwordHash,
        picturepath,
        freinds,
        location,
        occupation,
        viewedprofile: Math.floor(Math.random()*10000),
        impressions:Math.floor(Math.random()*10000)

    });
    const saveduser=await newuser.save();
    res.status(210).json(saveduser);
} catch(err){
    res.status(500).json({error:err.message});
    
    }
};
/*logging in*/
export const login =async (req,res)=> {
    try{
        const{email,password}=req.body;
        const user=await user.findone({email:email});
        if (!user) return res.status(400).json({msg:"user doesnt exist"});

        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch)return res.status(400).json({msg:"imvalid credentials"});
        
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({token,user});
    } catch(err){
        res.status(500).json({error:err.message});
        
        }
}