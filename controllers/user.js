import User from "../models/user.js";

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
  

export function signup(req, res) {
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
