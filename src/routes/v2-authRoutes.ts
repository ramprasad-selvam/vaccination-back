import { Router } from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

type UserTuple = [
  string, // name
  string, // email
  string, // password
  string, // phone
  string, // allergies
  string, // dob
  string, // gender
  string, // address
  number  // type
];

const authRouter = Router();
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite database.");
});
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varbinary(255),
    email varbinary(255) UNIQUE,
    password varbinary(255),
    phone varbinary(255),
    allergies text,
    dob date,
    gender varchar(10),
    address varbinary(255),
    type boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

authRouter.get("/login", (req, res) => {
  const { header, body, cookies } = req;
  res.status(200).json({
    message: "Login route",
  });
});

authRouter.get("/users", (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

authRouter.get("/add", (req, res) => {
  const dummyUsers: UserTuple[] = [
    [
      "John Doe",
      "john@example.com",
      "hashedpass123",
      "9876543210",
      "Peanuts",
      "1990-05-10",
      "Male",
      "123 Main St",
      1,
    ],
    [
      "Jane Smith",
      "jane@example.com",
      "hashedpass456",
      "9123456780",
      "None",
      "1992-08-15",
      "Female",
      "456 Oak Ave",
      1,
    ],
    [
      "Alex Ray",
      "alex@example.com",
      "hashedpass789",
      "9988776655",
      "Dust",
      "1988-12-01",
      "Other",
      "789 Elm Blvd",
      1,
    ],
    [
      "James",
      "James@example.com",
      "hashedpass789dfsdf",
      "",
      "",
      "",
      "Other",
      "",
      1,
    ],
  ];
  const arr: UserTuple[] = [];
  dummyUsers.map(async (user, i) => {
    user[3] = await bcrypt.hash(user[3], 10);
    const newUser: UserTuple = [
      user[0],
      user[1],
      user[2],
      user[3], // hashed phone
      user[4],
      user[5],
      user[6],
      user[7],
      user[8],
    ];

    arr.push(newUser);
    // db.run(`INSERT INTO users (name, email, password, phone, allergies, dob, gender, address, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    //     , user, function (err) {
    //         if (err) {
    //             return res.status(400).json({ error: err.message });
    //         }
    //         res.json({ id: this.lastID });
    //     });
  });
  res.status(200).json(arr);
});

export default authRouter;
