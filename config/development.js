const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  name: 'Development',
  port: Number(process.env.PORT),
}
