const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const permission = require('../middlewares/permission')

// Get all products
router.get('/', permission('admin', 'client'), async (req, res) => {
  const materiales = await sequelize.models.materiales.findAndCountAll()
  return res.status(200).json({ data: materiales })
})

// Create a new product
router.post('/', permission('admin', 'client'), async (req, res) => {
  const { body } = req
  const materiales = await sequelize.models.materiales.create({
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  })
  await product.save()
  return res.status(201).json({ data: materiales })
})

// Update a product by id
router.put('/:id', permission('admin'), async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const materiales = await sequelize.models.materiales.findByPk(id)
  if (!product) {
    return res.status(404).json({ code: 404, message: 'material not found' })
  }
  const updatedMaterial = await materiales.update({
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  })
  return res.json({ data: updatedMaterial })
})

// Delete a product by id
router.delete('/:id', permission('admin'), async (req, res) => {
  const {
    params: { id },
  } = req
  const material = await sequelize.models.products.findByPk(id)
  if (!material) {
    return res.status(404).json({ code: 404, message: 'material not found' })
  }
  await material.destroy()
  return res.json()
})

module.exports = router
