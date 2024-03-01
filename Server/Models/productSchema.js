const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

const productValidationSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(1).required(),
  image: Joi.string().required(),
  category: Joi.string().min(3).max(20).required(),
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productValidationSchema };
