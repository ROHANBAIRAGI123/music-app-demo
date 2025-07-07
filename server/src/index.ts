import { httpServer } from "./app";
import connectDB from "./db";
import "@dotenvx/dotenvx/config";

const PORT: number = Number(process.env.PORT) || 8001;

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
