const db = require("../db/db");
const moment = require("moment");

const words = [
  "ability",
  "able",
  "aboard",
  "about",
  "above",
  "accept",
  "accident",
  "according",
  "account",
  "accurate",
  "acres",
  "across",
  "act",
  "action",
  "active",
  "activity",
  "actual",
  "actually",
  "also",
  "although",
  "am",
  "among",
  "amount",
  "ancient",
  "angle",
  "angry",
  "animal",
  "announced",
  "another",
  "answer",
  "ants",
  "any",
  "anybody",
  "anyone",
];

const seed = () => {
  const time = moment().format("YYYY-MM-DD HH:mm");
  words.map(async (word) => {
    const insert = await db.query(
      "INSERT INTO products(requsted_by, product_name, requsted_at, user_id) VAlUES ($1, $2, $3, $4) RETURNING *",
      ["Axel", word, time, "c085cd28-10e4-4b16-bb93-25378e3509e2"]
    );
    if (insert) {
      console.log("Added new item");
    }
  });
};

seed();
