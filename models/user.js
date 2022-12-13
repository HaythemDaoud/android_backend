import mongoose from 'mongoose';
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
        groups:{
            type: String,
            default: ""
                }

    },
    
);

export default model('User', userSchema);