import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default {
  serverPort: process.env.SERVER_PORT!,
  serverCorsOrigin: process.env.SERVER_CORS_ORIGIN,
  dbUri: process.env.DB_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
  storagePath: path.resolve(process.env.STORAGE_PATH!)
};
