import express, { json } from 'express';
import cors from 'cors';
import http from 'http';

import cache from './middleware/cache';
import routes from './routes';

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(json());
app.use(cache(10));
app.use(routes);

server.listen(process.env.PORT || 3333);
