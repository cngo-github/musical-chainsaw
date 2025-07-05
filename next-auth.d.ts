import { JWT } from "next-auth/jwt"; // Import JWT from next-auth/jwt submodule
import { Session, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string | undefined;
    user: {
      id: number | null | undefined;
      name: string | null | undefined;
      image: string | null | undefined;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number | null | undefined;
    user: {
      image: string | null | undefined;
      name: string | null | undefined;
    };
  }
}
