import express from 'express';
import mongoose from 'mongoose';



import userRoutes from './routes/user.js';
import taskRoutes from './routes/task.js';
import projectRoutes from './routes/project.js';


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'espritpi';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://mongo:CosZ2MYtAjd9Efc8vXBL@containers-us-west-79.railway.app:7781`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());

app.use('/user', userRoutes);

app.use('/task', taskRoutes);

app.use('/project',projectRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});