import User from "../models/user.js";

export function signin(req, res) {
    User
    .findOne({ "id": req.body.id, "password": req.body.password })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
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
