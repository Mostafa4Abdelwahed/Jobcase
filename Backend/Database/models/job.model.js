const Joi = require("joi");
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    position: String,
    company: String,
    location: String,
    status: String,
    jobType: String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

function validationCreateJob(obj) {
    const Schema = Joi.object({
        position: Joi.string().trim().max(50).required(),
        company: Joi.string().trim().max(50).required(),
        location: Joi.string().trim().max(100).required(),
        status: Joi.string().trim().max(50).required(),
        jobType: Joi.string().trim().max(50).required(),
    })
    return Schema.validate(obj)
}

const job = mongoose.model("job", jobSchema);

module.exports = {
    job,
    validationCreateJob
}