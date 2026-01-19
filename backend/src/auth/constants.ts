import { config } from 'dotenv';

config();

export const jwtConstant = { secret: process.env.JWT_SECRET };
