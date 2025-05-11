const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, product, qty } = req.body;
    console.log(userId, product, qty);
    if (!userId || !product || !qty) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //console.log(`adding product: ${product}`);
    const newCartItem = new Cart({ userId, product, qty });
    await newCartItem.save();
    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/get-cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const cartItems = await Cart.find({ userId });
    console.log(cartItems);
    if (!cartItems) {
      return res.status(404).json({ message: 'No items found in cart' });
    }
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/update-cart/increase', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log(userId, productId);
        if (!userId || !productId) {
        return res.status(400).json({ message: 'All fields are required' });
        }
        const cartItem = await Cart.findOneAndUpdate(
        { userId, 'product._id': productId },
        { $inc: { qty: 1 } },
        { new: true }
        );
        if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });

router.post('/update-cart/decrease', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log(userId, productId);
        if (!userId || !productId) {
        return res.status(400).json({ message: 'All fields are required' });
        }
        const cartItem = await Cart.findOneAndUpdate(
        { userId, 'product._id': productId },
        { $inc: { qty: -1 } },
        { new: true }
        );
        if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });

router.delete('/remove-from-cart/:userId/:productId', async (req, res) => { 
    try {
        const { userId, productId } = req.params;
        console.log(userId, productId);
        if (!userId || !productId) {
        return res.status(400).json({ message: 'All fields are required' });
        }
        const cartItem = await Cart.findOneAndDelete(
        { userId, 'product._id': productId }
        );
        if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

module.exports = router;