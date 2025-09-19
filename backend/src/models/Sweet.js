const mongoose=require('mongoose');

const sweets_Schema=new mongoose.Schema({

    name:{ type:String, required:true, unique:true },
    price:{ type:Number, required:true,min:0 },
    description:{ type:String },
    category:{ type:String },
    imageUrl:{ type:String }
},{ timestamps:true });
module.exports = mongoose.model('Sweet', sweets_Schema);