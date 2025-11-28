import express from 'express';
import cors from 'cors';
import userRoutes from './src/routers/user.routes.js';
import taskRoutes from "./src/routers/task.routes.js";

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


export default app;