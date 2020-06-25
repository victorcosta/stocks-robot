import { Router } from "express";
import { index, view } from "./controller/Stocks";

const routes = Router();

routes.get("/stocks/", index);
routes.get("/stocks/:stockName", view);

export default routes;
