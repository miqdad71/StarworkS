const express = require('express')
const router = express.Router()
const uploadImage = require('../src/middleware/multer')

const {
  createPortfolio,
  getAllPortfolioById,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio
} = require('../src/controllers/PortfolioController')

router.post('/', createPortfolio)
router.get('/:enId', getAllPortfolioById)
router.get('/detail/:prId', getPortfolioById)
router.put('/:prId', uploadImage, updatePortfolio)
router.delete('/:prId', deletePortfolio)

module.exports = router
