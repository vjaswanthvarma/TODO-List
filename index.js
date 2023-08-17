const  express =require("express");
const dirname =require("path");
const  fileURLToPath =require("url");
const bodyParser=require("body-parser");
const app=express();
const data=[]
const data1=[]
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("publics"))
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.collection("todo").get().then((docs)=>{
    docs.forEach((doc)=>{
        data.push(doc.data().name);
    })
})
app.post("/",(req,res)=>{
    db.collection("todo").doc(req.body.List).set({
        name:req.body.List,
    })
    data.push(req.body.List);
    res.redirect("/");
})
app.get("/about",(req,res)=>{
    res.render("work.ejs",{
        name:data1,
    })
})
app.post("/about",(req,res)=>{
    db.collection("demo").doc(req.body.List).set({
        name:req.body.List,
    })
    data1.push(req.body.List);
    res.redirect("/about");
})
app.post("/delete",(req,res)=>{
    db.collection("todo").doc(req.body.key).delete();
    for(var i=0;i<data.length;i++){
        if(data[i]===req.body.key){
            delete data[i];
        }
    }
    res.redirect("/");

})
app.get("/",(req,res)=>{
    res.render("today.ejs",{
        name:data,
    })
})
app.listen(3000,(req,res)=>{
    console.log("This is TODO server");
})