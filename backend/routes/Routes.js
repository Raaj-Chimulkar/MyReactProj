import  express from "express";
import { Book } from "../models/booksModel.js";
const router = express.Router();


//Route for CRUD operations
router.post('/', async (request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({message: 'Fill all required fields:title, author, publishYear'});
        }
    const newBook={
        title: request.body.title,
        author: request.body.author,
        publishYear:request.body.publishYear
    };
    
    const book = await Book.create(newBook);
    return response.status(201).send(book);
    }
    catch(error){
    console.log(error.message)
    response.status(500).send(error.message)}
    });
    
    
router.get('/allbooks', async(request,response)=>{
        try{
            const books= await Book.find({});
    
            return response.status(200).json(books);
        }
        
        
        catch(error){
            console.log(error.message)
            response.status(500).send(error.message)}
    })
    
    
router.get('/:id', async(request,response)=>{
        try{
            const {id}=request.params;
            const books= await Book.findById(id);
    
            return response.status(200).json(books);
        }
        
        catch(error){
            console.log(error.message)
            response.status(500).send(error.message)}
    })
    
    
router.put('/:id', async(request,response)=>{
        try{
            if(
                !request.body.title||
                !request.body.author||
                !request.body.publishYear
            ){
                return response.status(400).send({message: 'Fill all required fields:title, author, publishYear'});
            }
            const {id}=request.params;
            const result= await Book.findByIdAndUpdate(id, request.body);
    
            if(!result){
                response.status(404).json({message: "Book not found!"})
            }
    
            return response.status(200).json({message: "Updated Succesfully!"});
        }
        
        catch(error){
            console.log(error.message)
            response.status(500).send(error.message)}
    })
    
    
router.delete('/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const result= await Book.findByIdAndDelete(id);
    
    if(!result){
        response.status(404).json({message: "Book not found!"})
    }
    
    return response.status(200).json({message: "Deleted Succesfully!"});
    }
    
    catch(error){
        console.log(error.message)
        response.status(500).send(error.message)}
    })

    
export default router;
    