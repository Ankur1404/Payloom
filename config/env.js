import { config } from 'dotenv';
import process from 'process';
config({ path: '.env.local' });
config({ path: '.env.production.local' });


export const port = process.env.PORT || 3000;
export const DB_URI=process.env.DB_URI;
export const {JWT_SECRET,JWT_EXPIRE,ARCJET_KEY,ARCJET_ENV,QSTASH_TOKEN,QSTASH_URL,EMAIL_PASSWORD,SERVER_URL,NODE_ENV}=process.env;

// console.log("ENV Loaded:", { JWT_SECRET, ARCJET_KEY, QSTASH_TOKEN, DB_URI });