import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const client = await MongoClient.connect(
  'mongodb://localhost:27017/food_stack_db',
);
const db = client.db();

const user = await db
  .collection('users')
  .findOne({ email: 'admin@shivshakti.com' });
console.log('User found:', !!user);
console.log('User fields:', Object.keys(user));
console.log('Password hash:', user.password);

const isValid = await bcrypt.compare('admin123', user.password);
console.log('Password valid:', isValid);

await client.close();
