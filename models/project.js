import mongoose, { Mongoose } from 'mongoose';

const { Schema, model } = mongoose;

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        emailuser1: {
            type: String,
            required: true
        },
        emailuser2: {
            type: String,
            required: true
        },
        emailuser3: {
            type: String,
            required: true
        },
        emailuser4: {
            type: String,
            required: true
        },
        emailuser5: {
            type: String,
            required: true
        },
        emailuser10: {
            type: String,
            required: true
        },
        emailuser20: {
            type: String,
            required: true
        },
    
    },
    
);

export default model('Project', projectSchema);
