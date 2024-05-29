const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

userSchema.virtual("jobs", {
    ref: "job",
    foreignField: "userId",
    localField: "_id"
})

function validationCreateUser(obj) {
    const Schema = Joi.object({
        name: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().min(14).max(50).required(),
        password: Joi.string().trim().min(6).max(30).required(),
    })
    return Schema.validate(obj)
}

function validationLoginUser(obj) {
    const Schema = Joi.object({
        email: Joi.string().trim().min(14).max(50).required(),
        password: Joi.string().trim().min(6).max(30).required(),
    })
    return Schema.validate(obj)
}

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        id: this._id,
        name: this.name,
        isAdmin: this.isAdmin
    }, process.env.SECRET_KEY)
}
const user = mongoose.model("user", userSchema);

module.exports = {
    validationCreateUser,
    validationLoginUser,
    user,
}