
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
    const authInstance = betterAuth({
        adapter: prismaAdapter(prisma, { provider: "postgresql" }),
        emailAndPassword: {
            enabled: true,
        },
    });

    console.log("Keys of authInstance:", Object.keys(authInstance));
} catch (e) {
    console.error(e);
}
