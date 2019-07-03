import { GraphQLServer } from 'graphql-yoga'
// import * as path from 'path'
// import * as Email from 'email-templates'
import { prisma } from './generated/prisma-client'
import {
  authQueries,
  authMutations,
  graphqlAuthenticationConfig
} from 'graphql-authentication'
import { GraphqlAuthenticationPrismaAdapter } from 'graphql-authentication-prisma'

const resolvers = {
  Query: {
    ...authQueries
  },
  Mutation: {
    ...authMutations
  }
}

// const mailer = new Email({
//   message: {
//     from: 'info@volst.nl'
//   },
//   views: {
//     root: path.join(__dirname, 'emails')
//   }
// })
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
    graphqlAuthentication: graphqlAuthenticationConfig({
      adapter: new GraphqlAuthenticationPrismaAdapter(),
      secret: 'wherearemyshoes'
      // mailer,
      // mailAppUrl: 'http://example.com'
    })
  })
})
server.start(() => console.log('Server is running on http://localhost:4000'))
