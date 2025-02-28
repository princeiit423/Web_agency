const mongoose = require('mongoose');
const express = require('express');

const contactSchema= mongoose.Schema({
    first: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    second: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    message: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    }
})
module.exports= mongoose.model("Contact", contactSchema);