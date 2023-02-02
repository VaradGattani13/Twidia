import jwt from 'jsonwebtoken';
export const  verifyToken=async(req,res,next)=>{
    try{
        let token=req.header("Authorization");
        if(!token) return res.status(403).send("Acess Denied");
        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();

        }
        const verified=jwt.verify(token,process.env.JWT_KEY);
        req.user=verified;
        next();
        

    }catch(e){
        res.status(500).josn({err:e.message});


    }

}