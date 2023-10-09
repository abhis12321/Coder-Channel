import mongoose from "mongoose";
const {mongo_username3 , mongo_password3} = process.env;

const model1 = new mongoose.Schema({        // data model
    fname:String,
    lname:String,
    school:String,
    age:Number,
    year:Number,
    branch:String,


});

const model2 = new mongoose.Schema({    //data model
    email:String,
    name:String,
    age:Number,
    gender:String,
    address:String,
    city:String,
    state:String,
    pin_code:Number,
    university:String,
    course:String,
    branch:String,
    semester:Number,
})

export const next1 = mongoose.models.next1 || mongoose.model('next1' , model1);  // constructor
export const next2 = mongoose.models.next2 || mongoose.model('next2' , model1);  // constructor
export const Student = mongoose.models.students || mongoose.model("students" , model2);  // constructor
export const mongoUrl = `mongodb+srv://${mongo_username3}:dJ68kiYeDaV7gsHL@mongo1.jrugiqf.mongodb.net/mongonext1?retryWrites=true&w=majority`;      //mongo atlas connection url