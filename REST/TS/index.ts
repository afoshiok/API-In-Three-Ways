import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"; //https://www.prisma.io/docs/concepts/components/prisma-client/crud

dotenv.config()

const app: Express = express();
const port = process.env.PORT;

const prisma = new PrismaClient()
app.use(express.json())


//GET REQUESTS

//GET all Barbers
app.get("/barber", async (req: Request, res: Response) => {
    await prisma.$connect() //Connects to the API to Prisma client
    const barbers = await prisma.barber.findMany()
    .then(async () => {
        await prisma.$disconnect()
    })
    res.json(barbers)
})

app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`)
})