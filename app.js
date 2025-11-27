import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import taskRoutes from "./routes/category.routes.js";

const app = express();

registerStaticFiles(app);
app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/usuarios', userRoutes);
app.use('/api/tareas', taskRoutes);


app.use(express.json());

export default app;