import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import log4js from 'log4js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

dotenv.config();

log4js.configure('./log4js_setting.json', { reloadSecs: 300 });
const logger = log4js.getLogger();

const app = express();

app.use(log4js.connectLogger(logger, { level: log4js.levels.DEBUG }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    logger.debug('サーバー起動', `http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
  });
