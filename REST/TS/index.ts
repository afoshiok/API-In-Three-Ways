import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"; //https://www.prisma.io/docs/concepts/components/prisma-client/crud

dotenv.config()

const app: Express = express();
const port = process.env.PORT;

const prisma = new PrismaClient()

//GET REQUESTS

//GET all Barbers
app.get("/barber", async (req: Request, res: Response) => {
    const barbers = await prisma.barber.findMany()
    res.json(barbers)
})

app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`)
})