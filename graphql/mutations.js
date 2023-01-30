const { GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql')
const Note = require('../models/Note')
const User = require('../models/User')
const { NoteType, UserType } = require('../graphql/types')

const createNote = {
  type: NoteType,
  description: 'Create a New Note',
  args: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    important: { type: new GraphQLNonNull(GraphQLBoolean) }
  },
  async resolve (_, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('You must be logged in to do that')

    const userFound = await User.findById(verifiedUser.id)
    if (!userFound) throw new Error('Unauthorized')

    const note = new Note({
      // authorId: verifiedUser._id,
      content: args.content,
      date: args.date,
      important: args.important
    })

    return note.save()
  }
}

const createUser = {
  type: UserType,
  description: 'Create a New User',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    passwordHash: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve (_, args) {
    const user = new User({
      // authorId: verifiedUser._id,
      username: args.username,
      name: args.name,
      passwordHash: args.passwordHash
    })

    return user.save()
  }
}

module.exports = { createNote, createUser }
