const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


//generate a random code with 8 numbers (works)
function generateCode() 
{
	var length = 8,
		charset = "0123456789",
		retVal = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}
// reset password 
 async function resetPassword (req, res) {
	const { email, password,} = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400).json({ error: "User don't exists" });
	} else {
		const token = generateCode();
		process.env.code=token;
		user.token = token;
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		res.status(200).json({ message: "password changed" })
			};
			};



//MODIFY PROFILE

async function editUser  (req, res) {
	const {email, name,} = req.body;
	const user = await User.findOne({ email });

       if (name === ''){ 
        res.json("username is empty")
        return "user is empty"
    }

    if ( name!= ''){ 
		if(user.email == email){
			user.name = name; 
			user.save();
		}
		else {
			res.json("email don't match")
		}
       
    }
    console.log("profile updated")
    return res.json({user})
};

module.exports = {
  resetPassword,
  editUser

}
