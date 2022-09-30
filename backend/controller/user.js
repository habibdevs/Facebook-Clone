const bcrypt = require("bcrypt");
const { validationEmail, validateLength } = require("../helpers/validation.js");
const User = require("../models/User.js");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      birthyear,
      birthmonth,
      birthday,
      gender,
    } = req.body;

    //email validation

    if (!validationEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    //user validation user exists or not

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email already exists, try differrent email to continue",
      });
    }

    //text length check

    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "First name must between 3 to 30 carecter" });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Last name must between 3 to 30 carecter" });
    }
    if (!validateLength(password, 8, 40)) {
      return res.status(400).json({ message: "Password must greater than 8" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    

    return;
    const user = await new User({
      first_name,
      last_name,
      email,
      password,
      username,
      birthyear,
      birthmonth,
      birthday,
      gender,
    }).save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
