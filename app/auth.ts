import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/writeClient";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existingUser = await client
        .config({
          useCdn: false,
        })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio ?? "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .config({
            useCdn: false,
          })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile.id,
          });

        Object.assign(token, {
          id: user?._id,
          user: { id: user?.id, name: user?.name, image: user?.image },
        });
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, {
        id: token.id,
        user: {
          id: token?.id,
          name: token?.user?.name,
          image: token?.user?.image,
        },
      });

      return session;
    },
  },
});
