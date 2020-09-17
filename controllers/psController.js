const User = require("../models/User");
var nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Rakesh Mariyaplar', {
    expiresIn: maxAge
  });
};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

var otp="00000"
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
  
module.exports.ps_get = (req, res) => {
    res.render("psreset")
}

module.exports.reqcode = async (req, res) => {
    const {email,password} = req.body

    otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)        
    var mailOptions = {
        from: 'rakesh723@gmail.com',
        to: email,
        subject: 'Recovery Code to reset password',
        text: 'Recovery code : '+otp
      };
    try{
        const user = await User.finduser(email);
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                errors.email="Unable to send Verification code to this email Id"
                res.status(400).json({
                    errors
                });} else {
                    res.status(200).json({status: 'Verification code sent you registered email Id'});
             }
          }); 
        
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({
            errors
        });
    }
   
}

module.exports.ps_post = async (req, res) => {
    var {email,password} = req.body
    if(otp==req.body.otp)
    {
        try {
            const salt = await bcrypt.genSalt();
            password=await bcrypt.hash(password, salt)
            const user= await User.findOneAndUpdate(email,{password},{new: true});
            const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
        } catch (err) {
            res.status(400).json({errors});
        }
    }else{
        const errors="{otp: 'Invalid verification Code'}"
            res.status(400).json(errors);
    }
    
}