/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

async function createAdmin() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('food_stack_db');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await db.collection('users').insertOne({
    name: 'Admin',
    email: 'admin@shivshakti.com',
    password: hashedPassword,
    role: 'Admin',
  });

  console.log('✅ Admin user created!');
  console.log('Email: admin@shivshakti.com');
  console.log('Password: admin123');

  await client.close();
}

createAdmin().catch(console.error);
