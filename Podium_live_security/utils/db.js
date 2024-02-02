const mongoose=require("mongoose");

uri="mongodb://localhost:27017/FinalDB";

const connectDB=()=>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports=connectDB;