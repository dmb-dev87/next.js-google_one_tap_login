export { GET, POST } from '@/auth'

// import { OAuth2Client } from 'google-auth-library';
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from "next-auth/providers/google";

// const googleAuthClient = new OAuth2Client("50117126583-fkgi6uqq92vpmqnc30u8hvlkmsrui1pg.apps.googleusercontent.com");

// const handler = NextAuth({
//   session: {
//     strategy: 'jwt'
//   },
//   providers: [    
//     CredentialsProvider({
//       id: 'googleonetap',
//       name: 'google-one-tap',
//       credentials: {
//         credential: { type: 'text' },
//       },
//       authorize: async (credentials) => {
//         const token = credentials!.credential;
//         console.log("++++++++++", token)
//         const ticket = await googleAuthClient.verifyIdToken({
//           idToken: token,
//           audience: process.env.GOOGLE_CLIENT_ID,
//         });

//         const payload = ticket.getPayload();

//         if (!payload) {
//           throw new Error('Cannot extract payload from signin token');
//         }

//         return payload;
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     })
//   ]
// })


// const handler = NextAuth;

// export { handler as GET, handler as POST };

export const runtime = 'edge'
