import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseAuth } from './firebase.config';


declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    Credentials({
      id: "googleonetap",
      name: 'google-one-tap',
      credentials: {
        credential: { type: 'text' },
      },
      authorize: async (credentials: any) => {
        const token = credentials!.credential;

        const payload = GoogleAuthProvider.credential(token);

        try {
          const userCredenital = await signInWithCredential(FirebaseAuth, payload)
          console.log("++++++++++++ credentials", userCredenital);

          if (!userCredenital) {
            throw new Error('Cannot extract payload from signin token');
          }

          return userCredenital;
        } catch (error) {
          console.log(error);
        }
      }
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      console.log("++++++++++++++++++ jwt", token)
      return token
    },
    authorized({ auth }) {
      console.log("+++++++++++++++ auth", auth)
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
