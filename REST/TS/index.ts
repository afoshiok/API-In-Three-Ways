import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"; //https://www.prisma.io/docs/concepts/components/prisma-client/crud

dotenv.config()

const app: Express = express();
const port = process.env.PORT;

const prisma = new PrismaClient()

app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`)
})