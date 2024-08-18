import express, { Application, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

// router.post('/api/auth/signup ', UserController.createUser);

app.get('/', (req, res) => {
  res.send('Bike Rent Server is Running');
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
