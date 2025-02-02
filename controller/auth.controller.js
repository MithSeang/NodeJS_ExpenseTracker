const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("login user", req.body);
  const sql = `SELECT * FROM USERS WHERE EMAIL = ?`;
  var params = [email];
  try {
    db.get(sql, params, async (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error Login", error: err.message });
      }
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.HASH_PASS);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      const token = jwt.sign(
        {
          id: user.ID,
          username: user.USERNAME,
          email: user.EMAIL,
        },
        "expenses",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login successful",
        data: {
          userId: user.ID,
          username: user.USERNAME,
          email: user.EMAIL,
          token: token,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getCurrentUser = (req, res) => {
  const id = req.user.id; //Extract id in middleware token
  const param = [id];
  const sql = `SELECT ID, USERNAME, EMAIL FROM USERS WHERE ID = ?`;
  db.get(sql, param, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving user", error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user.ID,
        username: user.USERNAME,
        email: user.EMAIL,
      },
    });
  });
};
const readUser = (req, res) => {
  const sql = `SELECT ID, USERNAME, EMAIL FROM USERS`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to read users", error: err.message });
    } else {
      res.status(200).json({
        message: "Get all users successfully",
        data: rows,
      });
    }
  });
};
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received request body: ", req.body);

  const hashPassword = await bcrypt.hash(password, 10);
  var params = [username, email, hashPassword];
  const sql = `INSERT INTO USERS (USERNAME,EMAIL,HASH_PASS) VALUES (?,?,?)`;
  try {
    db.run(sql, params, function (error) {
      if (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
          return res
            .status(400)
            .json({ message: "User or Email already registered" });
        }
        console.log("Failed to insert user" + error.message);
        return res
          .status(500)
          .json({ message: "Failed to register user", error: error.message });
      }

      return res.status(201).json({
        message: "User registered successfully",
        data: {
          id: this.lastID,
          username: username,
          email: email,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error hashing password", error: error.message });
  }
  // res.send("Register User!");
};
module.exports = { loginUser, registerUser, readUser, getCurrentUser };
