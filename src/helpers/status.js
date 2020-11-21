module.exports = {
  statusGet: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Success to get data',
      data: result
    })
  },

  statusLogin: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Login success',
      data: result
    })
  },

  statusLoginFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Email or password is invalid!'
    })
  },

  statusRegistration: (res) => {
    res.status(201).send({
      success: true,
      message: 'Registration success'
    })
  },

  statusRegistrationFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to registration!'
    })
  },

  statusCreate: (res) => {
    res.status(201).send({
      success: true,
      message: 'Add data success'
    })
  },

  statusCreateFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to add data!'
    })
  },

  statusUpdate: (res) => {
    res.status(200).send({
      success: true,
      message: 'Update data success'
    })
  },

  statusUpdateFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to update data!'
    })
  },

  statusDelete: (res) => {
    res.status(200).send({
      success: true,
      message: 'Delete data success'
    })
  },

  statusDeleteFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to delete data!'
    })
  },

  statusServerError: (res) => {
    res.status(500).send({
      success: false,
      message: 'Internal Server Error!'
    })
  },

  statusNotFound: (res) => {
    res.status(404).send({
      success: false,
      message: 'Data not found!'
    })
  },

  statusNotFoundAccount: (res) => {
    res.status(404).send({
      success: false,
      message: 'Account not registered!'
    })
  },

  statusTokenError: (res) => {
    res.status(404).send({
      success: false,
      message: 'Account registered!'
    })
  },

  statusLoginRequired: (res) => {
    res.status(404).send({
      success: false,
      message: 'Account not registered!'
    })
  }
}
