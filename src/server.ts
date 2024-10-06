import http, { Server } from 'http'
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from './config/db'
import userRoute from './routes/userRoute'
import { log } from 'console';

dotenv.config();
const app: Application = express();
const server: Server = http.createServer(app);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.use('/api/users', userRoute)

const PORT = process.env.PORT || 4040
connectDB().then(() => {
    console.log("Database connection established...");
    server.listen(PORT, () => {
        console.log(`App is listening on PORT: ${PORT}`)
    })
}).catch(error => {
    console.error("Failed to connect to the database...")
    console.error(error)
})