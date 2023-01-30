const { GraphQLList } = require('graphql')
const Note = require('../models/Note')
const User = require('../models/User')
const { UserType, NoteType } = require('./types')

const users = {
  type: new GraphQLList(UserType),
  description: 'Get all users',
  resolve: () => User.find()
}

// console.log(users.resolve())

const notes = {
  type: new GraphQLList(NoteType),
  description: 'Note all notes',
  resolve: () => Note.find()
}

module.exports = { users, notes }
