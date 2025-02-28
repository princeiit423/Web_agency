const mongoose = require('mongoose');
const express = require('express');

const subscribeSchema= mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
})
module.exports= mongoose.model("Subsriber", subscribeSchema);