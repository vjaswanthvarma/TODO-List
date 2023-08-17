import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app=express();
const data=[]
const dirna=dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.post("/",(req,res)=>{
    data.push(req.body.List);
    res.render("today.ejs",{
        name:data,
    })
})
app.get("/",(req,res)=>{
    res.render("today.ejs")
})
app.get("/about",(req,res)=>{
    res.render("work.ejs");
})
app.listen(3000,(req,res)=>{
    console.log("TODO list server is on");
})