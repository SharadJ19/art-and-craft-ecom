const asyncHandler = require('express-async-handler');
const db = require('../models');
const { validateProductInput } = require('../utils/validators');

// @desc    Fetch all products (simple version without pagination)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            [db.Sequelize.Op.like]: `%${req.query.keyword}%`,  // Use LIKE for MySQL
          },
        }
      : {};

    const products = await db.Product.findAll({
      where: keyword,
      order: [['createdAt', 'DESC']],
      raw: true, // Add this to get plain JSON objects
    });

    // Format products with proper price conversion
    const formattedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price) || 0, // Ensure price is always a number
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
});



// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await db.Product.findByPk(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  const { errors, valid } = validateProductInput(name, description, price, stock);

  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors).join(', '));
  }

  const product = await db.Product.create({
    name,
    description,
    price,
    stock,
    imageUrl: req.file ? req.file.path : null
  });

  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  const { errors, valid } = validateProductInput(name, description, price, stock);

  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors).join(', '));
  }

  const product = await db.Product.findByPk(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.imageUrl = req.file ? req.file.path : product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await db.Product.findByPk(req.params.id);

  if (product) {
    await product.destroy();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};