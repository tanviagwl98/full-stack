const adminAuth = (req,res,next) =>{
    console.log("Authentication")
    const token = "xyz"
    const isAdmin = token === 'xyz'
    if(!isAdmin){
        res.status(401).send("Not authenticated")
    } else{
        next();
    }
}

module.exports = {
    adminAuth:adminAuth
}