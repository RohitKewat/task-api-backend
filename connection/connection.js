

const mongoose = require('mongoose');
 
const connection =()=>{
    const url = "mongodb+srv://Rohit:rohit@cluster0.vrcqw6n.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(url)
  .then(() => console.log(' mongo DB Connected!')).catch((e)=>{
    console.log(e);
  });
}
module.exports = connection 