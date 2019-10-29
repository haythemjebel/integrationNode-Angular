import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"

let bookSchema = new mongoose.Schema({
    titre:{type:String,required:true},
    author:{type:String,required:true},
    price:{type:Number,required:true},
    publishdate:{type:Date,required:false,default: new Date()},
    available:{type:Boolean,required:false,default:true},
    quantite:{type:Number,required:false,default:0},
});

bookSchema.plugin(mongoosePaginate);

const Book=mongoose.model("book",bookSchema)

export default Book;