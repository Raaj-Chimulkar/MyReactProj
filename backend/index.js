import express, { request, response } from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (request, response)=>{
console.log(request);
return response.status(234).send('Welcome!')
})



mongoose.connect(mongoDBURL)
.then(()=>{
console.log('App connected to db!')
app.listen(port,()=>{
    console.log(`App is running fine on Port : ${port}` );
});
})
.catch((error)=>{
console.log(error)
});