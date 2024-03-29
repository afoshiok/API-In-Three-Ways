"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client"); //https://www.prisma.io/docs/concepts/components/prisma-client/crud
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
//GET REQUESTS
//GET all Barbers
app.get("/barber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect(); //Connects to the API to Prisma client
    const barbers = yield prisma.barber.findMany(); //Equivalent to "SELECT * FROM BARBER"
    res.json(barbers);
}));
//GET Barber by ID
app.get("/barber/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect(); //Connects to the API to Prisma client
    const { id } = req.params;
    try {
        const barber_info = yield prisma.barber.findUnique({
            where: { id: Number(id) }
        });
        res.json(barber_info);
    }
    catch (error) {
        res.json({ error: `${id} does not exist in this database` });
    }
}));
//GET all Customers
app.get("/customer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const customers = yield prisma.customer.findMany();
    res.json(customers);
}));
//GET Customer by ID
app.get("/customer/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    try {
        const cust_info = yield prisma.customer.findUnique({
            where: { id: Number(id) }
        });
        res.json(cust_info);
    }
    catch (error) {
        res.json({ error: `${id} does not exist in this database` });
    }
}));
//GET all Services
app.get("/service", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const services = yield prisma.service.findMany();
    res.json(services);
}));
//GET Service by ID
app.get("/service/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    try {
        const service_info = yield prisma.service.findUnique({
            where: { id: Number(id) }
        });
        res.json(service_info);
    }
    catch (error) {
        res.json({ error: `${id} does not exist in this database` });
    }
}));
app.get("/appointment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const appointments = yield prisma.appointment.findMany();
    res.json(appointments);
}));
//POST REQUESTS
//POST add barber to database
app.post("/barber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const barber_info = {
        barberFirstName: req.body.barberFirstName,
        barberLastName: req.body.barberLastName,
        barberPhoneNum: req.body.barberPhoneNum,
        barberStatus: req.body.barberStatus, //Remember from schema.prisma, it can only be "ACTIVE" or "INACTIVE"
    };
    yield prisma.barber.create({
        data: barber_info
    }).then(() => {
        res.send("Barber added to database!");
    })
        //ERROR HANDLING
        .catch((error) => {
        console.error(error);
        res.send("Error encountered, check your terminal for more info");
    });
}));
//POST add customer
app.post("/customer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const cust_info = {
        custFirstName: req.body.custFirstName,
        custLastName: req.body.custLastName,
        custPhoneNum: req.body.custPhoneNum
    };
    yield prisma.customer.create({
        data: cust_info
    }).then(() => {
        res.send("Customer added to database!");
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//POST add service
app.post("/service", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const service_info = {
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice
    };
    yield prisma.service.create({
        data: service_info
    }).then(() => {
        res.send("Service add to database!");
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//POST add appointment
app.post("/appointment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const appointment_info = {
        custId: req.body.custId,
        barberId: req.body.barberId,
        apptTime: new Date(req.body.apptTime),
        serviceId: req.body.serviceId
    };
    yield prisma.appointment.create({
        data: appointment_info
    }).then(() => {
        res.send("Appointment added to database!");
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//PUT REQUESTS
//PUT update barber
app.put("/barber/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    const barber_data = {
        barberFirstName: req.body.barberFirstName,
        barberLastName: req.body.barberLastName,
        barberPhoneNum: req.body.barberPhoneNum,
        barberStatus: req.body.barberStatus, //Remember from schema.prisma, it can only be "ACTIVE" or "INACTIVE"
    };
    yield prisma.barber.update({
        where: { id: Number(id) },
        data: barber_data //Updates the data based on request body
    }).then(() => {
        res.send(`Barber ID: ${id} has been updated`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//PUT update customer
app.put("/customer/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    const cust_data = {
        custFirstName: req.body.custFirstName,
        custLastName: req.body.custLastName,
        custPhoneNum: req.body.custPhoneNum
    };
    yield prisma.customer.update({
        where: { id: Number(id) },
        data: cust_data
    }).then(() => {
        res.send(`Customer ID: ${id} has been updated`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//PUT update service
app.put("/service/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    const service_data = {
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice.toFixed(2)
    };
    yield prisma.service.update({
        where: { id: Number(id) },
        data: service_data
    }).then(() => {
        res.send(`Service ID: ${id} has been updated`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//PUT update appointment
app.put("/appointment/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    const appt_data = {
        custId: req.body.custId,
        barberId: req.body.barberId,
        apptTime: new Date(req.body.apptTime),
        serviceId: req.body.serviceId
    };
    yield prisma.appointment.update({
        where: { id: Number(id) },
        data: appt_data
    }).then(() => {
        res.send(`Appointment ID: ${id} has been updated`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//DELETE
//DELETE remove barber
app.delete("/barber/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    yield prisma.barber.delete({
        where: { id: Number(id) }, //Deletes barber with a matching ID
    }).then(() => {
        res.send(`Barber with ID, ${id}, has been deleted.`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//DELETE remove customer
app.delete("/customer/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    yield prisma.customer.delete({
        where: { id: Number(id) }, //Deletes customer with a matching ID
    }).then(() => {
        res.send(`Customer with ID, ${id}, has been deleted.`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
//DELETE remove service
app.delete("/service/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    yield prisma.service.delete({
        where: { id: Number(id) }, //Deletes service with a matching ID
    }).then(() => {
        res.send(`Service with ID, ${id}, has been deleted.`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
app.delete("/appointment/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const { id } = req.params;
    yield prisma.appointment.delete({
        where: { id: Number(id) }, //Deletes service with a matching ID
    }).then(() => {
        res.send(`Appointment with ID, ${id}, has been deleted.`);
    })
        .catch((error) => {
        console.log(error);
        res.send("Error encountered, check terminal for more info");
    });
}));
app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`);
});
