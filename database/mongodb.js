const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
mongoose.set('strictQuery', true)

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

if (!connectionString) {
  console.error('Insetar la URI de mongodb en el archivo .env')
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connect!')
}).catch(err => {
  console.error(err)
})

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
