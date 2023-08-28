const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT || 4000;
const path = require("path");
const { connectDB } = require("./src/Loaders/database.loader");
const Record = require("./src/Schemas/record");

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
connectDB();

app.use(express.static("public"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/records", async (req, res) => {
  const records = await Record.find(
    {
      topic: { $ne: "" },
      pestle: { $ne: "" },
      intensity: { $ne: "" },
      likelihood: { $ne: "" },
      relevance: { $ne: "" },
      country: { $ne: "" },
    },
    {
      topic: 1,
      pestle: 1,
      intensity: 1,
      likelihood: 1,
      relevance: 1,
      region: 1,
      country: 1,
      start_year: 1,
      end_year: 1,
      title: 1,
      source: 1,
      sector: 1,
      insight: 1,
      impact: 1,
      url: 1,
    }
  );

  return res.json(records);

  await setTimeout(async () => {
    return res.json(records);
  }, 6000);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
