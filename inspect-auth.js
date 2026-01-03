
const { betterAuth } = require("better-auth");
const { PrismaClient } = require("@prisma/client");
const { prismaAdapter } = require("better-auth/adapters/prisma");

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
