import express from 'express';
import { port } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subRouter from './routes/subscription.routes.js';
import connectDb from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDb();

app.use(arcjetMiddleware); 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);
app.use("/api/workflow", workflowRouter);


app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Welcome to Subscription Manager');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
