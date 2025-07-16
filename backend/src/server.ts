import app from './app';
// import dotenv from 'dotenv';

// dotenv.config();
const PORT = process.env.PORT || 5000;
console.log("🚀 Server is starting...");

console.log("ENV KEY:", process.env.OPENAI_API_KEY);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
