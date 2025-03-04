const express= require("express");
const path= require("path");
const ejs= require("ejs");
const mongoose= require("mongoose");
const ejsMate= require("ejs-mate");
const bodyParser= require("body-parser");
const Contact= require("./models/contact.js");
const Subscriber= require("./models/subscribe.js");
const Inquiry= require("./models/inquiry.js");
const dotenv= require("dotenv");
const app = express();
dotenv.config();


const port= process.env.PORT || 4000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(bodyParser.urlencoded({ extended: true }));

try {
    mongoose.connect(process.env.DBURL,
        {useNewUrlParser: true, useUnifiedTopology: true})
} catch (error) {
    next(error);
}

app.get("/",(req,res)=>{
    try {
        res.render("home.ejs");
    } catch (error) {
        next(error);
    }
});
app.get("/admin",async(req,res,next)=>{
    try {
        const contacts= await Contact.find();
        res.render("dashboard.ejs",{contacts}); 
    } catch (error) {
        next(error);
    }
})

app.get("/contact",(req,res)=>{
   try {
    res.render("contact.ejs");
   } catch (error) {
    next(error);
   }
});
app.post("/contact", async(req,res,next)=>{
    try {
        const {first,second,email,phone,message}= req.body;
    const query=await new Contact({first,second,email,phone,message});
   await query.save();
    res.redirect("/contact");
    } catch (error) {
        next(error);
    }
})
app.get("/portfolio",(req,res)=>{
    try {
        res.render("portfolio.ejs");
    } catch (error) {
     next(error);   
    }
})
app.get("/detail",(req,res)=>{
    res.render("detail.ejs");
})
app.get("/form",(req,res)=>{
    res.render("form.ejs");
})
app.post("/form", async(req,res,next)=>{
    try {
        const { fullName, email, phone, website, projectType, budget, description } = req.body;

        const newInquiry = new Inquiry({
            fullName,
            email,
            phone,
            website,
            projectType,
            budget,
            description
        });

        await newInquiry.save();
        res.status(201).json({ message: "Inquiry submitted successfully!" });
    } catch (error) {
        console.log(error);
    }
})
app.post("/subscribe",async(req,res,next)=>{
    // ye functionality work nhi kr rha hai
    const {email}= req.body;
    //console.log(email);
    const query= await new Subscriber({email});
    await query.save();
    res.redirect("/");
})

app.use((err, req, res, next) => {
    res.render("error.ejs");
  });


app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})