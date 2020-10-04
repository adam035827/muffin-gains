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
        ") RETURNING *;"
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
    const query = await pool.query(
      "delete from split where split_id = $1 RETURNING *",
      [id]
    );

    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getExercises/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query(
      "select * from exercise where split_id = $1 order by last_modified_date desc",
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
      "insert into exercise (name, split_id, last_modified_date, weight, reps, sets, is_strength) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
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

app.put("/updateExercise/:id", async (req, res) => {
  try {
    const query = await pool.query(
      "update exercise set last_modified_date = NOW(), weight = $1, reps = $2, sets = $3 where exercise_id = $4",
      [req.body.weight, req.body.reps, req.body.sets, req.params.id]
    );

    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/newArchivedExercise", async (req, res) => {
  try {
    const query = await pool.query(
      "insert into archived_exercise (exercise_id, name, split_id, last_modified_date, weight, reps, sets, is_strength) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      [
        req.body.exercise_id,
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "ui/build/index.html"));
});

app.listen(PORT, () => {
  console.log("server has started");
});
