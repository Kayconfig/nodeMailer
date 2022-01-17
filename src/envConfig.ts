import { config } from 'dotenv';
config();
export default {
  USER_PASS: process.env.USER_PASS,
  USERNAME: process.env.USERNAME,
  CLIENTID: process.env.CLIENTID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  FROM: process.env.FROM,
  PORT: process.env.PORT,
};
