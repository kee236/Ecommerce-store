const asynchHandler = require('express-async-handler')
const Product = require('../models/productModel')

//Get all product
const getProducts = asynchHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductById = asynchHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product)
        res.json(product)
    else
        res.status(404).json({message:"Sorry, product not found"})
})

module.exports = {
    getProducts,
    getProductById
}