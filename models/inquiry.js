const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
    projectType: { type: String, required: true },
    budget: { type: Number, required: true },
    description: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Inquiry", inquirySchema);
