import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },


  providers: [

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),



    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),



    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
        console.log(user)
        // const session = {
        // }

        if (user.success) {
          return user.data; // Return user object if login is successful
        } else {
          return null; // Return null if login fails
        }
      },
    }),
  ],
  pages: {
    signIn: '/api/auth/signin',
    signUp: '/api/auth/signup',
  },

  callbacks: {
    // Store the user information in the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;         // Assuming the user object has an 'id' field
        token.accessToken = user.accessToken;
        token.role = user.role;     // Assuming the user object has a 'role' field
        token.email = user.email;   // Assuming the user object has an 'email' field
        token.name = user.name;     // Assuming the user object has a 'name' field
        console.log("jwt", token.accessToken)
      }
      return token;
    },
    // Make custom user data available in the session
    async session({ session, token }) {
      session.user.id = token.id;         // Pass user id to session
      session.user.role = token.role;     // Pass user role to session
      session.user.accessToken = token.accessToken;
      session.user.email = token.email;   // Pass user email to session
      session.user.name = token.name;     // Pass user name to session
      console.log(session.accessToken, "session")

      return session;
    },
  },
};
