import app from "./app";
import { PORT } from "./config/config";
import connectDB from "./config/connectDB";

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});