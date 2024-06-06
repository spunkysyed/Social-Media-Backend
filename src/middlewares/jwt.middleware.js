import jwt from 'jsonwebtoken';


const jwtAuth=(req,res,next) =>{
    // Read the token
    const token=req.headers['authorization'];

    
    // if no token
    if(!token){
        res.status(401).send("Unauthorized")
    }
    
    // check token is valid

    try{
        const payload=jwt.verify(token,"YZVpvTriK5Wacerv7p3vqY0FyVKKS9ME");
        req.userID=payload.userID;
    }
    catch(error){
        // return error
        res.status(401).send("Unautorized");
    }

    // call the next middleware
    next();

};

export default jwtAuth;