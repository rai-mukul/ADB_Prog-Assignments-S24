const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *         name:
 *           type: string
 *         main_category:
 *           type: string
 *         sub_category:
 *           type: string
 *         image:
 *           type: string
 *         ratings:
 *           type: number
 *         no_of_ratings:
 *           type: string
 *         actual_price:
 *           type: string
 *         discount_price:
 *           type: string
 *     Update Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         ratings:
 *           type: number
 *         no_of_ratings:
 *           type: string
 *         actual_price:
 *           type: string
 *         discount_price:
 *           type: string
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/products', productController.getAllProducts);

/**
 * @swagger
 * /products/{code}:
 *   get:
 *     summary: Get a product by code
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Product not found
 */
router.get('/products/:code', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post('/products', productController.createProduct);

/**
 * @swagger
 * /products/{code}:
 *   patch:
 *     summary: Update a product by code
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 */
router.patch('/products/:code', productController.updateProduct);

/**
 * @swagger
 * /products/{code}:
 *   delete:
 *     summary: Delete a product by code
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/products/:code', productController.deleteProduct);
router.get('/productBegin', productController.productBegin);

module.exports = router;
