const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { createNote, createUser } = require('./mutations')
const { users, notes } = require('./queries')

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: {
    users,
    notes
  }
})

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    createNote,
    createUser
  }
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
