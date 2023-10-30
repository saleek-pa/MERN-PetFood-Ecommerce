const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
})

const User = mongoose.model('User', userSchema)

const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    // username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports = { User, userRegisterSchema, userLoginSchema }

// const bcrypt = require("bcrypt");
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 10);
//     }
//     next();
// })