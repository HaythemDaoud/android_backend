import mongoose from 'mongoose';
import Project from "../models/project.js";
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        confirm: {
            type: Boolean,
            default: false
        },
        usertype:{
            type:String,
            default: "student"
        },
        groups:[{
            type: Schema.Types.ObjectId,
            ref: Project
                }]

    },
    
);

export default model('User', userSchema);