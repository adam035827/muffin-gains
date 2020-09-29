const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
    const splits = await pool.query("select * from split");
    res.json(splits.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getSplits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const splits = await pool.query("select * from split where user_id = $1", [
      id,
    ]);
    res.json(splits.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started");
});
