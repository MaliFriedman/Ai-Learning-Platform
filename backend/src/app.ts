import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import subCategoryRoutes from "./routes/subCategory.routes";
import promptRoutes from "./routes/prompt.routes";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerRoute from './routes/swagger.routes';
import { setupSwagger } from "./config/swagger";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sub-categories", subCategoryRoutes);
app.use("/api/prompts", promptRoutes);
app.use('/api/docs', swaggerRoute);


app.use(errorHandler);

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

setupSwagger(app); 

export default app;
