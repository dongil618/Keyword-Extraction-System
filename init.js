import "./db";
import app from "./app";
import cron from "node-cron";
import dotenv from "dotenv";
import "./models/Keyword";
import updateAmt from "./apiCrawler/updateAmt";
import updateBlogTotal from "./apiCrawler/updateBlogTotal";


dotenv.config();

cron.schedule('*/2 * * * *', () => {
  console.log("2분마다 updateRealtime")
  updateAmt();
  updateBlogTotal();

});

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);