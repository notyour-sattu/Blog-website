import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email:{
        type: String,
        // required: true,
        unique: true
    },
    username:{
        type: String,
        // required: true,
        unique: true
    },
    password:{
        type: String
        // required: true
    },
    googleId:{
        type:String
    }
});

const user = mongoose.model('user', userSchema);

export default user; 