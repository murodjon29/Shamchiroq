import { config } from 'dotenv';

config();

export default {
  PORT: Number(process.env.PORT),
  PG_HOST: String(process.env.PG_HOST),
  PG_PORT: Number(process.env.PG_PORT),
  PG_USER: String(process.env.PG_USER),
  PG_PASS: String(process.env.PG_PASS),
  PG_DB: String(process.env.PG_DB),
};
