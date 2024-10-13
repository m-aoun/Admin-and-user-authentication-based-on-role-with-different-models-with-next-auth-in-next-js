import NextAuth , { CredentialsSignin }  from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import dbConnect from "./lib/dbConnect"
import User from "./lib/models/user/user"
import bcrypt from "bcryptjs"
import Admin from "./lib/models/admin/admin"
import { getToken } from "next-auth/jwt";


class UserNotFound extends CredentialsSignin {
    code = "User Not Found"
}
class WrongCredentials extends CredentialsSignin {
    code = "Wrong Credentials"
}
   
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        let user = null;
        let role = "user";  // Default role
        await dbConnect();
        // logic to salt and hash password
        user = await User.findOne({ email: credentials.email });
        console.log('user', user);
        if (!user) {
            user = await Admin.findOne({ email: credentials.email });
            console.log('admin', user);
            if (user) {
              role = "admin";  // If found in the Admin model, set role to admin
              const checkPassword = await bcrypt.compare(credentials.password, user.password);
              if (!checkPassword) {
                throw new WrongCredentials();
              }
       
              // return user object with their profile data
              user.password = undefined;
              return { ...user.toObject(), role }; 
            }
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new UserNotFound();          
        }
        const checkPassword = await bcrypt.compare(credentials.password, user.password);
        if (!checkPassword) {
          throw new WrongCredentials();
        }
 
        // return user object with their profile data
        user.password = undefined;
        return { ...user.toObject(), role };  // Attach role to user object
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom sign-in page      
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is present, add user info to the token
      if (user) {
        token.role = user.role;  // Add the role to the JWT
      }
      return token;
    },
    async session({ session, token }) {
      // Add the role from the token to the session for client-side access
      session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
        // Redirect based on the user's role
        if (url.startsWith("/")) return `${baseUrl}${url}`; // Ensure relative URLs are used correctly
  
        const role = await getToken({ secret: process.env.AUTH_SECRET }).role;
        if (role === "admin") {
          return `${baseUrl}/admin/dashboard`; // Redirect admins to admin dashboard
        } else {
          return `${baseUrl}/user/dashboard`;  // Redirect users to user dashboard
        }
      }
  },
  secret: process.env.AUTH_SECRET, // Secret for JWT
})