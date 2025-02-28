const express= require("express");
const path= require("path");
const ejs= require("ejs");
const ejsMate= require("ejs-mate");
const bodyParser= require("body-parser");
const app = express();


const port= 4000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});
app.get("/portfolio",(req,res)=>{
    res.render("portfolio.ejs");
})
app.get("/detail",(req,res)=>{
    res.render("detail.ejs");
})


app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})