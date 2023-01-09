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

//GET Service by ID
app.get("/service/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    try {
        const service_info = await prisma.service.findUnique({
            where: { id : Number(id) }
        })
        res.json(service_info)
    }
    catch (error){
        res.json({error: `${id} does not exist in this database`})
    }
})

app.get("/appointment", async (req: Request, res: Response) => {
    await prisma.$connect()
    const appointments = await prisma.appointment.findMany()
    res.json(appointments)
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

    await prisma.barber.create({  //IN SQL: "INSERT INTO Barber VALUES (barber_info)"
        data: barber_info
    }).then(() => {
        res.send("Barber added to database!")
    })
    //ERROR HANDLING
    .catch((error) => {
        console.error(error)
        res.send("Error encountered, check your terminal for more info")
    })
})

//POST add customer
app.post("/customer", async (req: Request, res: Response) => {
    await prisma.$connect()
    const cust_info = {
        custFirstName: req.body.custFirstName,
        custLastName: req.body.custLastName,
        custPhoneNum: req.body.custPhoneNum
    }

    await prisma.customer.create({
        data: cust_info
    }).then(() => {
        res.send("Customer added to database!")
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//POST add service
app.post("/service", async (req: Request, res: Response) => {
    await prisma.$connect()
    const service_info = {
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice
    }

    await prisma.service.create({
        data: service_info
    }).then(() => {
        res.send("Service add to database!")
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//POST add appointment
app.post("/appointment", async (req: Request, res: Response) => {
    await prisma.$connect()
    const appointment_info = {
        custId : req.body.custId,
        barberId : req.body.barberId,
        apptTime: new Date(req.body.apptTime), //Adds the time to the db in "YYYY-MM-DD HH:MM:SS" format but uses ISO-8601 for GET /appointment
        serviceId: req.body.serviceId
    }

    await prisma.appointment.create({
        data: appointment_info
    }).then(() => {
        res.send("Appointment added to database!")
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//PUT REQUESTS

//PUT update barber
app.put("/barber/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    const barber_data = {
        barberFirstName: req.body.barberFirstName,
        barberLastName: req.body.barberLastName,
        barberPhoneNum: req.body.barberPhoneNum,
        barberStatus: req.body.barberStatus, //Remember from schema.prisma, it can only be "ACTIVE" or "INACTIVE"
    }
    await prisma.barber.update({
        where: {id: Number(id)}, //Finds barber by ID 
        data: barber_data //Updates the data based on request body
    }).then(() => {
        res.send(`Barber ID: ${id} has been updated`)
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//PUT update customer
app.put("/customer/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    const cust_data = {
        custFirstName: req.body.custFirstName,
        custLastName: req.body.custLastName,
        custPhoneNum: req.body.custPhoneNum
    }
    await prisma.customer.update({ //Same format as PUT barber
        where: {id: Number(id)},
        data: cust_data
    }).then(() => {
        res.send(`Customer ID: ${id} has been updated`)
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//PUT update service
app.put("/service/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    const service_data = {
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice.toFixed(2)
    }
    await prisma.service.update({ //Same format as PUT barber
        where: {id: Number(id)},
        data: service_data
    }).then(() => {
        res.send(`Service ID: ${id} has been updated`)
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//PUT update appointment
app.put("/appointment/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    const appt_data = {
        custId : req.body.custId,
        barberId : req.body.barberId,
        apptTime: new Date(req.body.apptTime), //Adds the time to the db in "YYYY-MM-DD HH:MM:SS" format but uses ISO-8601 for GET /appointment
        serviceId: req.body.serviceId
    }
    await prisma.appointment.update({ //Same format as PUT barber
        where: {id: Number(id)},
        data: appt_data
    }).then(() => {
        res.send(`Appointment ID: ${id} has been updated`)
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//DELETE

//DELETE remove barber
app.delete("/barber/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    await prisma.barber.delete({
        where: {id: Number(id)}, //Deletes barber with a matching ID
    }).then(() => {
        res.send(`Barber with ID, ${id}, has been deleted.`)
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})

//DELETE remove customer
app.delete("/customer/:id", async (req: Request, res: Response) => {
    await prisma.$connect()
    const { id } = req.params
    await prisma.customer.delete({
        where: {id: Number(id)}, //Deletes customer with a matching ID
    }).then(() => {
        res.send(`Customer with ID, ${id}, has been deleted.`)
    })
    .catch((error) => {
        console.log(error)
        res.send("Error encountered, check terminal for more info")
    })
})


app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`)
})