const { Mongoose } = require("mongoose")

const userSchema = new Mongoose.Schema({
  name:{
    type:String,
    default:null,
  },
  email:{
    type:Sring,
    unique:true,
    required:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
  },
  phoneNumber :{
    type:Number,
    required:true,
  },
  token:{
    type:String,
    default:null
  }
});

const User = mongoose.model("user",userSchema);

module.exports = User;