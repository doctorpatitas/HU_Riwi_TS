import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { ConnectDB } from './config/db.js'
import tlRouter from './routes/tl.routes.js';
import trackRouter from './routes/track.routes.js';
import clanRouter from './routes/clan.routes.js';
import coderRouter from './routes/coder.routes.js';


const {PORT} = process.env

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/tl', tlRouter);
app.use('/track', trackRouter);
app.use('/clan', clanRouter);
app.use('/coder', coderRouter);

async function startServer() {
    await ConnectDB();

    app.listen(PORT, () => {
        console.log("Server running in port", PORT);
    });
}

startServer();
// app.listen(PORT, async() => {
//     await ConnectDB();

//     console.log("Server running in port", PORT);
// });

