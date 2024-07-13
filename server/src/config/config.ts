import dotenv from 'dotenv'
dotenv.config();

export const secret_key = process.env.ENCRYPTION_SECRET_KEY
export const secret_iv = process.env.ENCRYPTION_SECRET_IV
export const encryption_method = process.env.ENCRYPTION_METHOD