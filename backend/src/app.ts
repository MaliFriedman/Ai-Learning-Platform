import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import subCategoryRoutes from "./routes/subCategory.routes";
import promptRoutes from "./routes/prompt.routes";
import { errorHandler } from "./middlewares/error.middleware";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sub_categories", subCategoryRoutes);
app.use("/api/prompts", promptRoutes);


app.use(errorHandler);

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
