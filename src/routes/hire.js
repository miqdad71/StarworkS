const express = require('express')
const router = express.Router()

const {
  createHire,
  getAllHireByEngineer,
  getAllHireByProject,
  getAllHireByCompany,
  checkIsHire,
  updateHireStatus
} = require('../controllers/hire')

const {
  authorization
} = require('../middleware/auth')

router.post('/', authorization, createHire)
router.get('/engineer/:enId', authorization, getAllHireByEngineer)
router.get('/project/:pjId', authorization, getAllHireByProject)
router.get('/company/:cnId', authorization, getAllHireByCompany)
router.get('/check', authorization, checkIsHire)
router.put('/:hrId', authorization, updateHireStatus)

module.exports = router
