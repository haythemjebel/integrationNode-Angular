import express ,{Request,Response} from "express";
import mongoose from 'mongoose';
import Book from "./book.model"
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const uri="mongodb://localhost:27017/BIBLIO2";

app.use(bodyParser.json())
app.use(cors())
mongoose.connect(uri,(err)=>{
    if(err)console.log(err)
    else console.log("Mongo Data base Connected")
})

app.get("/",(req:Request,resp:Response)=>{
    resp.send("Hello Express");
});

app.get("/books",(req:Request,resp:Response)=>{
    Book.find((err,data)=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send(data)
        }
    })
});

app.get("/books/:id",(req:Request,resp:Response)=>{
    Book.findById(req.params.id,(err,data)=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send(data)
        }
    })
});

app.post("/books",(req:Request,resp:Response)=>{
    let book = new Book(req.body)
    book.save(err=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send(book)
        }
    })
});

app.put("/books/:id",(req:Request,resp:Response)=>{
    Book.findByIdAndUpdate(req.params.id,req.body, (err)=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send("book update")
        }
    })
});

app.delete("/books/:id",(req:Request,resp:Response)=>{
    Book.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send("book deleted")
        }
    })
});

/**Get  Http://localhost:8085/pBooks?page=0&size=3 */
app.get("/pbooks",(req:Request,resp:Response)=>{
    let p :number = parseInt(req.query.page || 1);
    let size :number = parseInt(req.query.size || 3);
    Book.paginate({},{page:p,limit:size},(err,data)=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send(data)
        }
    })
});

/**Get  Http://localhost:8085/BooksSearch?kw=J&page=0&size=3 */
app.get("/BooksSearch",(req:Request,resp:Response)=>{
    let p :number = parseInt(req.query.page || 1);
    let size :number = parseInt(req.query.size || 3);
    let kw :string = req.query.kw || "";
    Book.paginate({titre:{$regex:".*(?i)"+kw+".*"}},{page:p,limit:size},(err,data)=>{
        if(err){
            resp.sendStatus(500).send(err);
        }else{
            resp.send(data)
        }
    })
});

app.listen(8085,()=>{
    console.log("serveur started");
});