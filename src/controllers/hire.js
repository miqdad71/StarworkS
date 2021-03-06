const {
  createHire,
  getAllHireByEngineer,
  getAllHireByProject,
  getAllHireByCompany,
  getHireById,
  checkIsHire,
  updateHireStatus
} = require('../models/hire')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusUpdate,
  statusUpdateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  getAllHireByEngineer: async (req, res, _next) => {
    const { enId } = req.params

    try {
      const result = await getAllHireByEngineer(enId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  getAllHireByProject: async (req, res, _next) => {
    const { pjId } = req.params

    try {
      const result = await getAllHireByProject(pjId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  getAllHireByCompany: async (req, res, _next) => {
    const { cnId } = req.params
    const { status } = req.query

    try {
      const result = await getAllHireByCompany(cnId, status)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  checkIsHire: async (req, res, _next) => {
    const { cnId } = req.query
    const { enId } = req.query

    try {
      const result = await checkIsHire(cnId, enId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  createHire: async (req, res, _next) => {
    try {
      const result = await createHire(req.body)

      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  },

  updateHireStatus: async (req, res, _next) => {
    try {
      const { hrId } = req.params
      const findData = await getHireById(hrId)

      if (findData.length) {
        const result = await updateHireStatus(hrId, req.body)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}
