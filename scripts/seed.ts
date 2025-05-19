import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { seedDatabase } from '~/server/db/seed';
import { config } from 'dotenv';

// Load env variables
config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}

async function main() {
    const client = postgres(connectionString as string);
    const db = drizzle(client, { casing: 'snake_case' });

    try {
        console.log('🌱 Starting database seeding...');
        await seedDatabase(db);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main(); 