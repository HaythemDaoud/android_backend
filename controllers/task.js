import Task from "../models/task.js";

export function find(req, res) {
    Task
    .find({ "id_group": req.body.id_group })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    })
}
export function getalltask(req, res){
  Task.find({}).then(tasks => {
    res.status(200).json(tasks);
  })
  .catch(err => {
    res.status(500).json({ error: err });
})
}


export function create(req, res) {
    Task.create(req.body)
    .then((newTask) => {
      res.status(200).json({
        id_group: newTask.id_group,
        id_user: newTask.id_user,        
        name:newTask.name,
        desc: newTask.desc,
        deadline: newTask.deadline,
        stat: newTask.stat,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}