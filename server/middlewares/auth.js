const admin = require('../firebase/')
const User = require('../models/user');


exports.authCheck = async (req, res, next) =>{
    // console.log(req.headers)  //token

    try{
        // Firebase user details if token verified
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
        console.log('Firebase User in AuthCheck : ', firebaseUser);
        req.user = firebaseUser;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            err: "Invalid or Expires Token",
        })
    }
};


exports.adminCheck = async (req, res, next) => {
    const {email} = req.user;

    const adminUser = await User.findOne({email})

    if(adminUser.role !== 'admin') {
        res.status(403).json({
            err: "Access Denied.."
        })
    }else{
        next();
    }
};