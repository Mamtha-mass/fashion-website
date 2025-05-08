const mongoose= require('mongoose');


const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        trim:true,
        min:3,
        max:20,

    },
    lastname:{
        type:String,
        required: true,
        trim:true,
        min:3,
        max:20,

    },
    UserName:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,

    },
    email:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',

    },
    Contact:{
        type:String,
    },
    profile_picture:{
        type:String,
    },

},{timestamps:true});



module.exports=mongoose.model('user',userschema);