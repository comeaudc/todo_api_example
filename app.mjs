import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/users.mjs';
import todoRoutes from './routes/todos.mjs';

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

export default app;
