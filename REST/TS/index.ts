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
    const barbers = await prisma.barber.findMany()  //Equivalent to "SELECT * FROM BARBER"
    res.json(barbers)
})

//GET Barber by ID
app.get("/barber/:id", async (req: Request, res: Response) => {
    await prisma.$connect() //Connects to the API to Prisma client
    const { id } = req.params
    try {
        const barber_info = await prisma.barber.findUnique({  //Equivalent to "SELECT * FROM BARBER WHERE id = <req.params>"
            where: { id : Number(id) }
        })
        res.json(barber_info)
    }
    catch (error){
        res.json({ error: `${id} does not exist in this database` })
    }
})

//GET all Customers
app.get("/customer", async (req: Request, res: Response) => {
    await prisma.$connect()
    const customers = await prisma.customer.findMany()
    res.json(customers)
})

//GET Customer by ID
app.get("/customer/:id", async (req: Request, res: Response) => {
    await prisma.$connect() 
    const { id } = req.params
    try {
        const cust_info = await prisma.customer.findUnique({  //Equivalent to "SELECT * FROM CUSTOMER WHERE id = <req.params>"
            where: { id : Number(id) }
        }).then(async () => {
            await prisma.$disconnect() 
        })
        res.json(cust_info)
    }
    catch (error){
        res.json({ error: `${id} does not exist in this database` })
    }
})

//GET all Services
app.get("/service", async (req: Request, res: Response) => {
    await prisma.$connect()
    const services = await prisma.service.findMany()
    res.json(services)
})


//POST REQUESTS

//POST add barber to database
app.post("/barber",async (req: Request, res: Response) => {
    await prisma.$connect()
    const barber_info = {  //All of this will go in your request body
        barberFirstName: req.body.barberFirstName,
        barberLastName: req.body.barberLastName,
        barberPhoneNum: req.body.barberPhoneNum,
        barberStatus: req.body.barberStatus, //Remember from schema.prisma, it can only be "ACTIVE" or "INACTIVE"
    }

    await prisma.barber.create({
        data: barber_info
    }).then(() => {
        res.send("Barber added to database!")
    })
    //ERROR HANDLING
    .catch((error) => {
        console.error(error)
        res.send("Error encountered, check your terminal")
    })
})

app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`)
})