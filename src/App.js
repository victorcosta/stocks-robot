import express, { json } from "express";

import cors from "cors";
import cache from "./middleware/cache";

import routes from "./routes";

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(json());
app.use(cache(10));
app.use(routes);

server.listen(process.env.PORT || 3333);
