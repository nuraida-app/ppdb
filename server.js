import "dotenv/config";
import app from "./app.js";
import { connect } from "./config/database.js";

app.get("/", (req, res) => {
  res.redirect(process.env.DOMAIN_1);
});

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`Server running on port: ${process.env.PORT}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
});
