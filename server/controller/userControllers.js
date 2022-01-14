const bcrypt = require("bcrypt");

const User = require("../models/User");

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const userPresent = await User.find({ email });
  if (userPresent.length)
    return res.status(409).json({ status: "error", message: "Email/User already exists." }); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //store the new user
    const newUser = {
      name,
      email,
      password: hashedPwd,
    };

    const user = await new User(newUser).save();

    console.log("Created user ", user);
    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Username and password are required." });

  const [userPresent] = await User.find({ email });
  console.log(userPresent);
  if (!userPresent)
    return res.status(401).json({ status: "error", message: "Email/Password does not match." }); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, userPresent.password);
  if (match) {
    // create JWTs
    res.json({ message: `User is validated!`, result: userPresent });
  } else {
    res.status(401).json({ status: "error", message: "Email/Password does not match." });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ message: "Users fetched successfully", result: users });
};

module.exports = { handleNewUser, handleLogin, getAllUsers };
