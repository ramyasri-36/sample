import jwt from 'jsonwebtoken';
export const verifytoken=async(req,resizeBy,next)=>{
    try{
        let token = req.header("authorization");
        if(!token){
            return resizeBy.status(403).send("acess denied");
        }
        if(token.startswith("bearer")){
            token=token.slice(7,token.legth).trimleft();
            
        }
        const verified =jwt.verify(token,process.env.jwt_secret);

        req.user=verified;
        next();
    } catch(err){
        res.status(500).json({error:err.message});

        
        }
}