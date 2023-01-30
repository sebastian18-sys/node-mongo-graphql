const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = require('graphql')

const User = require('../models/User')
const Note = require('../models/Note')

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    passwordHash: { type: GraphQLString },
    notes: {
      type: NoteType,
      resolve (parent) {
        return Note.findById(parent.id)
      }
    }
  })
})

const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'Note Type',
  fields: () => ({
    content: { type: GraphQLString },
    date: { type: GraphQLString },
    import: { type: GraphQLBoolean },
    user: {
      type: UserType,
      resolve (parent) {
        return User.findById(parent.id)
      }
    }
  })
})

module.exports = { UserType, NoteType }
