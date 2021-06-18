const Users = require('../jokes/jokes-model');


const validateBody = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
            status: 400,
            message: 'username and password required'
        })
    } else {
        next()
    }
}

async function checkUsernameFree(req, res, next) {
    const users = await Users.findBy({ username: req.body.username })
    if(!users) {
        next()
    } else {
    next({ message: "username taken", status: 422 })
    }
}

  const checkUsernameExists = async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await Users.findBy({ username })
      if (!user) {
        next({
          status: 401,
          message: 'invalid credentials'
        })
      } else {
        req.user = user
        next()
      }
    } catch (err) {
      next(err)
    }
  }

  module.exports = {
      validateBody,
      checkUsernameFree,
      checkUsernameExists
  }