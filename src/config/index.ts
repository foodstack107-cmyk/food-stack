import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  DB_DATABASE,
  DB_HOST,
  DB_NAME,
  NEXT_PUBLIC_DEPLOYMENT_URL,
  NODE_ENV,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;
