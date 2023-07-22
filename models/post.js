const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        require:true,
        
    },
    desc:{
        type:String,
        max: 500,

    },
    img: {           
        type:String,
    },
    likes:{
        type: String,
    
    },
  
   
 },

 { timestamps: true }

);

module.exports.posts = mongoose.model("post", postSchema)
