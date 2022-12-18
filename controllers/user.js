import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import nodemailer from'nodemailer';
const JWT_SECRET='some super secret...';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'espritpi2223@gmail.com',
    pass: 'rzjzmbftoyzuqcvb'
  }
});
export function signin(req, res) {
    User
    .findOne({ "email": req.body.email, "password": req.body.password })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export function addgroup(req, res){
  const gr_id=req.params.groupid;
  console.log(`test si id recu ${gr_id} `)
  User.findOne({"email":req.params.usermail})
  .then(user=>{
    user.groups.push(gr_id);
    res.status(200).json(user);
  }
  )

}

//------------***************------------------*****************----------------********
export function forgot_password(req,res,next){
  
  User.findOne({ "email": req.body.email }).then(user=>{
    if(!user) {
      console.log('No account with that email address exists.')
    }else{
      const secret = JWT_SECRET + user.password;
      const payload = {username: user.username,email:user.email};
      const token = jwt.sign(payload,secret,{expiresIn: '5m'});
      console.log('req.headers.host'+ 'verification lien de host ');
      const link = `http://${req.headers.host}/user/reset_password/${user.email}/${token}`
      console.log(link);
      res.send(`password send to your email Mr./Mrs ${user.username}`);

      var mailOptions = {
        from: 'espritpi2223@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js ' ,
        text: `click the link to reset password ${link}`  ,
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        });
      

    }
  });
}
///reset_password_get/:email/:token
export function reset_password_get(req,res,next){
  User.findOne({ "email": req.params.email }).then(user=>{
    if(!user) {
      res.send('No account with that email address exists.')
    }else {
      const secret = JWT_SECRET + user.password;
      try{
        const payload = jwt.verify(req.params.token, secret)
        res.render('reset-password',{email: user.email})
      } catch(error){
        console.log(error.message)
        res.send(error.message)
      }
    }
  });
}
export function reset_password_post(req,res){
  const {password,password2} = req.body
  User.findOne({ "email": req.params.email }).then(user=>{
    if(!user) {
      res.send('No account with that email address exists.')
    }else {
      const secret = JWT_SECRET + user.password;
      if(password === password2){
      try{

        const payload = jwt.verify(req.params.token, secret);
        user.password = password;
        user.save();
        res.send("password reset successfully")
        
      } catch(error){
        console.log(error.message)
        res.send(error.message)
      }
    }else{res.send("")}
    }
  });
}



/*
export async function forgot(req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
          console.log('No account with that email address exists.')
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {
      let smtpTransport= nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'espritpi2223@gmail.com',
          pass: 'rzjzmbftoyzuqcvb'
        }
      
      });
      var mailOptions = {
        to: user.email,
        from: 'espritpi2223@gmail.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log('mail sent');
        res.send("mail sent");
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
  });
};*/
//------------***************------------------*****************----------------********
export function patchOnce(req, res) {
  User
  .findOne({ "mail": req.params.usermail })
  .then(doc => {
    console.log(doc.username);
      doc.groups.push(req.params.groupid);
      doc.save();
      res.status(200).json(doc);
  })
  .catch(err => {
      res.status(500).json({ error: err });
  });
}
//------------***************------------------*****************----------------********
export function joingroup(user_mail, group_id)
{  console.log(`test si id recu ${group_id} `);
  User.findOneAndUpdate({ "email": user_mail},{"groups": group_id}
  , function(err, docs ){if (err){
    console.log(err)
}
else{
    console.log("Updated Docs : ", docs);
}});
  //console.log(`user group updated : user ${user_mail} is added to group with id ${group_id} `)

    }
  

    export async function signup(req, res) {
      const  user = await User.findOne({"email":req.body.email});
      if(user){
        res.status(400).json({ error: "User already exists" });
      } else {
      User.create(req.body)
        .then((newUser) => {
          res.status(200).json({
            id:newUser.id,
            username: newUser.username,
            password: newUser.password,
            email: newUser.email,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
      }
    }
/*
export function putOnce(req, res) {
    User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(doc1 => {
        User.findById(req.params.id)
          .then((doc2) => {
            res.status(200).json(doc2);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}*/
