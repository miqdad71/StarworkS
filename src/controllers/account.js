require('dotenv').config()
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const {
  createAccount,
  updateAccount,
  getAccountById,
  getAccountByEmail
} = require('../models/account')

const {
  statusRegistration,
  statusRegistrationFail,
  statusRegistrationUnique,
  statusUpdate,
  statusUpdateFail,
  statusLogin,
  statusLoginFail,
  statusNotFound,
  statusNotFoundAccount,
  statusServerError,
  statusTokenError
} = require('../helpers/status')

module.exports = {
  createAccount: async (req, res, _next) => {
    try {
      const findData = await getAccountByEmail(req.body.ac_email)

      if (!findData.length) {
        const result = await createAccount(req.body)

        if (result.affectedRows) {
          statusRegistration(res)
        } else {
          statusRegistrationFail(res)
        }
      } else {
        statusRegistrationUnique(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },

  updateAccount: async (req, res, _next) => {
    try {
      const { acId } = req.params
      const findData = await getAccountById(acId)

      if (findData.length) {
        const result = await updateAccount(acId, req.body)

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
  },

  loginAccount: async (req, res, _next) => {
    try {
      const { email, password } = req.body
      const findData = await getAccountByEmail(email)

      if (findData.length) {
        const match = await bcrypt.compare(password, findData[0].ac_password)

        if (match) {
          const payload = {
            ac_id: findData[0].ac_id,
            en_id: findData[0].en_id,
            cn_id: findData[0].cn_id,
            ac_name: findData[0].ac_name,
            ac_email: findData[0].ac_email,
            ac_level: findData[0].ac_level,
            ac_phone: findData[0].ac_phone,
            ac_password: findData[0].ac_password
          }

          JWT.sign({ payload }, process.env.JWT_KEY, { expiresIn: '30d' }, (err, token) => {
            if (token) {
              const result = {
                ...payload,
                token: token
              }

              statusLogin(res, result)
            } else {
              statusTokenError(res, err)
            }
          })
        } else {
          statusLoginFail(res)
        }
      } else {
        statusNotFoundAccount(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}
