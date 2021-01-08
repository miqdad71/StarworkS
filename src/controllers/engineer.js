const {
  getAllEngineer,
  getSearchEngineer,
  getEngineerById,
  updateEngineer,
  getFilterEngineer
} = require('../models/engineer')

const isEmpty = require('lodash.isempty')

const {
  statusGet,
  statusUpdate,
  statusUpdateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  getAllEngineer: async (req, res, _next) => {
    let { search, limit, page } = req.query

    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      search: search,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      let result

      if (isEmpty(search)) {
        result = await getAllEngineer(paginate)
      } else {
        result = await getSearchEngineer(paginate)
      }

      if (result.length) {
        statusGet(res, nestedEngineer(result))
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  getEngineerById: async (req, res, _next) => {
    const { enId } = req.params

    try {
      const result = await getEngineerById(enId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  getFilterEngineer: async (req, res, _next) => {
    let { filter, limit, page } = req.query

    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      filter: filter,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      let result

      if (isEmpty(filter)) {
        result = await getAllEngineer(paginate)
      } else {
        result = await getFilterEngineer(paginate)
      }

      if (result.length) {
        statusGet(res, nestedEngineer(result))
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  updateEngineer: async (req, res, _next) => {
    const { enId } = req.params

    try {
      const findData = await getEngineerById(enId)

      if (findData.length) {
        req.body.image = req.file === undefined ? findData[0].en_profile : req.file.filename

        const data = {
          ...req.body,
          en_profile: req.body.image
        }

        delete data.image

        const result = await updateEngineer(enId, data)

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
