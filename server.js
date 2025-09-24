const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database setup
const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});
// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    subcategory TEXT,
    date TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS participation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId INTEGER,
    activityId INTEGER,
    FOREIGN KEY(studentId) REFERENCES students(id),
    FOREIGN KEY(activityId) REFERENCES activities(id)
  )`);
});

// Register student
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("Please provide name, email, and password.");
  }
  db.run(
    "INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Registration failed.");
      }
      res.send("Student registered successfully!");
    }
  );
});

// Add activity
app.post("/api/add-activity", (req, res) => {
  const { name, type, subcategory, date } = req.body;
  db.run(
    "INSERT INTO activities (name, type, subcategory, date) VALUES (?, ?, ?, ?)",
    [name, type, subcategory, date],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Get all activities
app.get("/api/events", (req, res) => {
  db.all("SELECT * FROM activities", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Add activity
app.post("/api/add-activity", (req, res) => {
  const { name, type, subcategory, date } = req.body;

  db.run(
    "INSERT INTO activities (name, type, subcategory, date) VALUES (?, ?, ?, ?)",
    [name, type, subcategory, date],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Get all activities
app.get("/api/events", (req, res) => {
  db.all("SELECT * FROM activities", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


