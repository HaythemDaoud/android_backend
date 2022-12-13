import Project from "../models/project.js";
//import { v4 as uuidv4 } from 'uuid';
//uuidv4();
import nodemailer from 'nodemailer';
import { joingroup } from "./user.js";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'espritpi2223@gmail.com',
    pass: 'rzjzmbftoyzuqcvb'
  }
});


export function alltasks(req, res){
  Project.findOne({"_id": req.params.alltasks})
  .then(doc => {
    res.status(200).json(doc);
})
.catch(err => {
  res.status(500).json({ error: err });
})
  ;
}

export function addprojectgroupe(req, res) {
    let project = new Project({ 
        name: req.body.name,
        emailuser1: req.body.emailuser1,
        emailuser2: req.body.emailuser2,
        emailuser3: req.body.emailuser3,
        emailuser4: req.body.emailuser4,
        emailuser5: req.body.emailuser5,
        emailuser10: req.body.emailuser10,
        emailuser20: req.body.emailuser20})

    Project.create(project)
    .then(newgroup => {
      const newgroup_id = newgroup;
      addtogroup(newgroup_id);
      res.status(200).json(newgroup);
  })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
    function addtogroup(newgroup_id){
          joingroup(newgroup_id.emailuser2,newgroup_id._id)


          var mailOptions = {
            from: 'espritpi2223@gmail.com',
            to: [req.body.emailuser1,req.body.emailuser2,req.body.emailuser3,req.body.emailuser4,req.body.emailuser5],
            subject: 'Sending Email using Node.js ' ,
            text: `click the link to join your group `+ 'http://localhost:9090/user/addgroup/'+newgroup_id._id  ,
          }
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
            });
        }
    
}
/*var projectid = uuidv4();
    console.log(projectid)*/
    

export function loginproject(req, res) {
    Project
    .findOne(
      {"name": req.body.name, "emailuser1": req.body.emailuser1 }
      )
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

/*"tasks.name":req.body.name,"tasks.desc":req.body.desc,
  "tasks.deadline":req.body.deadline,"tasks.stat":req.body.stat*/