import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const taskSchema = Schema(
    {   
        id_group:{
            type: String,
            required: true
        },
        creator:{
            type: String,
            required: true
        },        
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String, 
            required: true
        },
        deadline: {
            type: String,
            required: true            
        },
        stat: {
            type: String,            
        },
        }
);
export default model('Task', taskSchema);