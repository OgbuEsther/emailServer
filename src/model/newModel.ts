import mongoose from "mongoose";

interface INew {
    password : string;
    date : string
}

interface News extends INew , mongoose.Document{}


const NewSchema = new mongoose.Schema({
    password : {
        type : String
    },
    date : {
        type : String
    }
})

const newModel = mongoose.model<News>("newModel" , NewSchema)

export default newModel