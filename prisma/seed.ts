import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting seed...");
    console.log("Checking DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined");
    try {
        await prisma.$connect();
        console.log("✅ Connected to database");
        await prisma.$disconnect();
    } catch (e) {
        console.error("❌ Failed to connect:", e);
        process.exit(1);
    }
}

main();
