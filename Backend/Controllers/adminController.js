const { User } = require('../Models/userSchema')
const { Product, productValidationSchema } = require('../Models/productSchema')
const Order = require('../Models/orderSchema')
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        if (username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ username },
                process.env.ADMIN_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                status: 'success',
                message: 'Successfully Logged In.',
                data: { jwt_token: token }
            })
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    },



    getAllUsers: async (req, res) => {
        const users = await User.find()
        if (users.length == 0) {
            return res.json({ message: "User collection is empty!" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched user datas.',
            data: users
        })
    },



    getUserById: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched user data.',
            data: user
        })

    },



    getAllProducts: async (req, res) => {
        const products = await Product.find()
        if (products.length == 0) {
            return res.json({ message: "Product collection is empty!" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched products details.',
            data: products
        })
    },



    getProductById: async (req, res) => {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched product details.',
            data: product
        })

    },



    getProductsByCategory: async (req, res) => {
        // products/category?name=men
        const categoryName = req.query.name
        const products = await Product.find({ category: categoryName })
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched products details by category.',
            data: products
        })
    },



    createProduct: async (req, res) => {
        const { error, value } = productValidationSchema.validate(req.body);
        if (error) { return res.status(400).json({ message: error.details[0].message }) }
        const { title, description, price, category } = value
        const image = req.imageUrl

        try {
            await Product.create({ title, description, image, price, category });
            res.status(201).json({
              status: "success",
              message: "Successfully created a product.",
            });
        } catch (error) {
            return res.status(500).json({ message: "Failed to create a product" });
        }
    },



    updateProduct: async (req, res) => {
        const { error, value } = productValidationSchema.validate(req.body);
        if (error) { return res.status(400).json({ message: error.details[0].message }) }
        const { title, description, price, category, id } = value
        const image = req.imageUrl

        const product = await Product.findByIdAndUpdate(id, {
            $set: { title, description, image, price, category }
        })
        if (product) {
            res.json({
                status: 'success',
                message: 'Successfully updated a product.',
            })
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    },



    deleteProduct: async (req, res) => {
        const { id } = req.body
        const product = await Product.findByIdAndRemove(id)
        if (product) {
            res.json({
                status: 'success',
                message: 'Successfully deleted a product.',
            })
        } else {
            res.status(404).json({ message: 'Product not found' });

        }
    },



    getOrders: async (req, res) => {
        const orders = await Order.find()

        if (orders.length == 0) {
            return res.json({ message: "No Orders" })
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched order details.',
            data: orders
        })
    },

    

    getStats: async (req, res) => {
        const stats = await Order.aggregate([{
            $group: {
                _id: null,
                totalProductsSold: { $sum: { $size: "$products" } },
                totalRevenue: { $sum: { $toDouble: "$total_amount" } }
            }
        },
        { $project: { _id: 0 } }
        ])

        res.json({
            status: 'success',
            message: 'Successfully fetched stats.',
            data: stats
        })
    }
}