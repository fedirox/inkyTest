// Import required modules
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

// Create the Express app
const app = express();

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(express.json());

// Open the SQLite database
let db = new sqlite3.Database(
  "./db/inkyfada.db",
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to database.");
  }
);

app.get("/", (_, res) => {
  res.send("ok");
});

app.get("/inky", (req, res) => {
  console.log(req.query.query);
  const { start_date, end_date } = req.query;
  console.log({ start_date, end_date });

  const sql = `SELECT MAX(eventValue)as maxValue, strftime('%Y-%m-%d', createdAt) AS day ,visitId
   FROM events 
   WHERE eventType=1 
   AND ? <= day
   AND day <= ?
   GROUP BY visitId, day`;
  try {
    db.all(sql, [start_date, end_date], (err, rows) => {
      if (err) return res.json({ status: 300, success: false, error: err });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    // Handle any errors that occur during the query execution
    return res.json({ status: 400, success: false, error });
  }
});

// Define a catch-all route for handling 404 errors
app.use((_, res) => {
  res.send("404");
});

// Start the server and listen on port 5000
app.listen(5000, console.log("server started on port 5000"));
