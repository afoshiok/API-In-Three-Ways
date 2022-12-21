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
    const barbers = yield prisma.barber.findMany()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
    res.json(barbers);
}));
app.get("/barber/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await prisma.$connect() //Connects to the API to Prisma client
    const { id } = req.params;
    try {
        const barber_info = yield prisma.barber.findUnique({
            where: { id: Number(id) }
        });
        res.json(barber_info);
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
}));
app.listen(port, () => {
    console.log(`Your REST API is running on https://localhost:${port} 👍`);
});
