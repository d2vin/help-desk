// import NextAuth from "next-auth";

// import { authOptions } from "~/server/auth";

// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import Nextauth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default Nextauth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
