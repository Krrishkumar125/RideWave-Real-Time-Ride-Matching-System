const jwt = require("jsonwebtoken");

const User = require("../models/user");

class AuthService {
  async register(userData) {
    try {
      const user = new User(userData);
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { user, token };
    } catch (error) {
      console.log("Error in auth service", error);
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { user, token };
    } catch (error) {
      console.log("Something went wrong in auth service", error);
    }
  }
}

module.exports = AuthService;