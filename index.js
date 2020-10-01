const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "ui/build")));
}

app.post("/newSplit", async (req, res) => {
  try {
    const query = await pool.query(
      "insert into split (name, user_id) values ('" +
        req.body.name +
        "', " +
        req.body.user_id +
        ");"
    );

    res.json(query.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getSplits", async (req, res) => {
  try {
    const query = await pool.query("select * from split");
    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getSplits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query("select * from split where user_id = $1", [
      id,
    ]);
    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/deleteSplit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query("delete from split where split_id = $1", [
      id,
    ]);

    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getExercises/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query(
      "select * from exercise where split_id = $1",
      [id]
    );

    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/newExercise", async (req, res) => {
  try {
    const query = await pool.query(
      "insert into exercise (name, split_id, last_modified_date, weight, reps, sets, is_strength) values ($1, $2, $3, $4, $5, $6, $7);",
      [
        req.body.name,
        req.body.split_id,
        req.body.date,
        req.body.weight,
        req.body.reps,
        req.body.sets,
        req.body.is_strength,
      ]
    );

    res.json(query.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log("server has started");
});
