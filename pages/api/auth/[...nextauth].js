import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import Models from "../../../models";

const { MONGODB_URI } = process.env;

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorizationUrl:
      //   "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // // ...add more providers here
    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const user = (credentials) => {
    //       // You need to provide your own logic here that takes the credentials
    //       // submitted and returns either a object representing a user or value
    //       // that is false/null if the credentials are invalid.
    //       // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //       return null;
    //     };
    //     if (user) {
    //       // Any user object returned here will be saved in the JSON Web Token
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    MONGODB_URI,
    // The second argument can be used to pass custom models and schemas
    {
      models: {
        User: Models.User,
      },
    }
  ),

  // A database is optional, but required to persist accounts in a database
  // database: MONGODB_URI,
});
