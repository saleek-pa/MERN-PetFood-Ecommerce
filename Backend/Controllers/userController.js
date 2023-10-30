const { User, userRegisterSchema, userLoginSchema } = require('../Models/userSchema')
const { Product } = require('../Models/productSchema')
const Order = require('../Models/orderSchema')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
let orderDetails = {};

module.exports = {
    register: async (req, res) => {
        const { error, value } = userRegisterSchema.validate(req.body);
        if (error) { return res.status(400).json({ message: error.details[0].message }) }
        const { name, username, email, password } = value

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, username, email, password: hashedPassword });

        res.json({
            status: 'success',
            message: "registered successfully"
        })
    },



    login: async (req, res) => {
        const { error, value } = userLoginSchema.validate(req.body);
        if (error) { return res.status(400).json({ message: error.details[0].message }) }
        const { email, password } = value

        const user = await User.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ email },
                    process.env.USER_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully Logged In.',
                    data: { jwt_token: token }
                })
            } else res.status(401).json({ message: 'Incorrect Password' })
        } else res.status(401).json({ message: 'User not found' });
    },



    getAllProducts: async (req, res) => {
        const products = await Product.find()
        if (products.length == 0) {
            return res.json({ message: "Product collection is empty!" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched products detail.',
            data: products
        })
    },



    getProductById: async (req, res) => {
        const productID = req.params.id
        const product = await Product.findById(productID)
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
        const category = req.params.categoryname
        const products = await Product.find({ category })
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched products details.',
            data: products
        })
    },



    showCart: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID).populate('cart');
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const cartItems = user.cart;
        if (cartItems.length === 0) { return res.status(404).json({ message: 'Cart is empty' }) }

        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched cart items.',
            data: cartItems,
        });
    },



    addToCart: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productID } = req.body
        const product = await Product.findById(productID);
        if (!product) { return res.status(404).json({ message: 'Product not found' }) }
        
        const updatedUser = await User.findByIdAndUpdate(userID, { $addToSet: { cart: productID } });
        if (!updatedUser) { return res.status(404).json({ message: 'Product already in cart' }) }

        res.status(200).json({
            status: 'success',
            message: 'Successfully added to cart'
        });
    },



    deleteFromCart: async (req, res) => {
        const userID = req.params.id
        const { productID } = req.body

        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        await User.findByIdAndUpdate(userID, { $pull: { cart: productID } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully removed from cart'
        });
    },



    showWishlist: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID).populate('wishlist');
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const wishlistItems = user.wishlist;
        if (wishlistItems.length === 0) { return res.status(404).json({ message: 'Wishlist is empty' }) }

        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched wishlist.',
            data: wishlistItems,
        });
    },



    addToWishlist: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productID } = req.body
        const product = await Product.findById(productID);
        if (!product) { return res.status(404).json({ message: 'Product not found' }) }

        const updatedUser = await User.findByIdAndUpdate(userID, { $addToSet: { wishlist: productID } });
        if (!updatedUser) { return res.status(404).json({ message: 'Product already in wishlist' }) }
        
        res.status(200).json({
            status: 'success',
            message: 'Successfully added to wishlist'
        });
    },



    deleteFromWishlist: async (req, res) => {
        const userID = req.params.id
        const { productID } = req.body

        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        await User.findByIdAndUpdate(userID, { $pull: { wishlist: productID } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully removed from wishlist'
        });
    },



    payment: async (req, res) => {
        const userID = req.params.id;
        const user = await User.findById(userID).populate('cart');
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        if (user.cart.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' })
        }

        const line_items = user.cart.map(product => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.title,
                        description: product.description
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: 1,
            };
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: 'http://127.0.0.1:3000/api/users/payment/success',
            cancel_url: 'http://127.0.0.1:3000/api/users/payment/cancel',
        });

        orderDetails = {
            userID,
            user,
            newOrder: {
                products: user.cart.map(product => new mongoose.Types.ObjectId(product._id)),
                order_id: Date.now(),
                payment_id: session.id,
                total_amount: session.amount_total / 100
            }
        };

        res.status(200).json({
            status: 'success',
            message: 'Stripe Checkout session created',
            sessionId: session.id,
            url: session.url
        })
    },



    success: async (req, res) => {
        const { userID, user, newOrder } = orderDetails;
        const order = await Order.create({ ...newOrder })
        await User.findByIdAndUpdate(userID, { $push: { orders: order._id } });

        user.cart = [];
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Payment was successful'
        });
    },



    cancel: async (req, res) => {
        res.status(200).json({
            status: 'failure',
            message: 'Payment was cancelled',
        });
    },



    showOrders: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID).populate('orders');
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const userOrders = user.orders;
        if (userOrders.length === 0) { return res.status(404).json({ message: 'You have no orders' }) }

        const orderDetails = await Order.find({ _id: { $in: userOrders } }).populate('products');

        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched order details.',
            data: orderDetails,
        });
    }
}