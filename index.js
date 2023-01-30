const express = require('express')
require('./database/mongodb')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
// const userRouter = require('./v1/routes/userRouter')
// const noteRouter = require('./v1/routes/noteRouter')
// const error404Handler = require('./middleware/notFound')

// app config
const app = express()
const PORT = process.env.PORT || 8000

// middlewars
app.use(cors())
app.use(express.json())

// API routes
app.get('/', (req, res) => res.json({ msg: 'Graphql API' }))

// Error
// app.use(error404Handler)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

// Server listen
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { server }
