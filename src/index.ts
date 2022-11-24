import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import routes from "./api/routes";
import * as MySQLConnector from "./api/utils/mysql.connector";
import logger from "./api/middlewares/logger.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// create database pool
MySQLConnector.init();

// compresses all the responses
app.use(compression());

// adding set of security middlewares
app.use(helmet());

// enable all CORS request
app.use(cors());

// add logger middleware
app.use(logger);

// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
