/**
 * PocketBase Database Setup Script
 *
 * Usage:
 * 1. Ensure PocketBase is running at http://127.0.0.1:8090
 * 2. Run: node scripts/setup-db.js <admin-email> <admin-password>
 */

const PocketBase = require('pocketbase/cjs');

async function setup() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: node setup-db.js <admin-email> <admin-password>');
        process.exit(1);
    }

    const [email, password] = args;
    const pb = new PocketBase('http://127.0.0.1:8090');

    try {
        console.log('Authenticating as admin...');
        await pb.admins.authWithPassword(email, password);

        const collections = [
            {
                name: 'scholarships',
                type: 'base',
                schema: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'provider', type: 'text', required: true },
                    { name: 'deadline', type: 'date' },
                    { name: 'value', type: 'text' },
                    { name: 'category', type: 'text' },
                    { name: 'location', type: 'text' },
                ],
                listRule: '', viewRule: '',
            },
            {
                name: 'marketplace',
                type: 'base',
                schema: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'price', type: 'number', required: true },
                    { name: 'category', type: 'text' },
                    { name: 'location', type: 'text' },
                    { name: 'seller_name', type: 'text' },
                ],
                listRule: '', viewRule: '', createRule: '@request.auth.id != ""',
            },
            {
                name: 'jobs',
                type: 'base',
                schema: [
                    { name: 'role', type: 'text', required: true },
                    { name: 'company', type: 'text', required: true },
                    { name: 'location', type: 'text' },
                    { name: 'type', type: 'text' },
                    { name: 'salary', type: 'text' },
                ],
                listRule: '', viewRule: '',
            },
            {
                name: 'posts',
                type: 'base',
                schema: [
                    { name: 'content', type: 'text', required: true },
                    { name: 'author_name', type: 'text' },
                    { name: 'university', type: 'text' },
                    { name: 'likes', type: 'number' },
                ],
                listRule: '', viewRule: '', createRule: '@request.auth.id != ""',
            }
        ];

        for (const colData of collections) {
            try {
                await pb.collections.create(colData);
                console.log(`Collection "${colData.name}" created successfully.`);
            } catch (e) {
                if (e.status === 400) {
                    console.log(`Collection "${colData.name}" already exists.`);
                } else {
                    throw e;
                }
            }
        }

        console.log('Database setup complete!');
    } catch (err) {
        console.error('Setup failed:', err.message);
        if (err.data) console.error('Details:', err.data);
    }
}

setup();
