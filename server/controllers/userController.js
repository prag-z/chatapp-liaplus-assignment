import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Non-Unique Username, Retry" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    return res.status(200).json({
      success: true,
      message: "New User Successfully Created",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Signing Up", error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User Not Found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(404).json({ stat: true, message: "Incorrect Password" });

      user.isOnline = true;
      await user.save();
      const userDetails = {
          _id: user._id,
          username: user.username,
          isOnline: user.isOnline,
      };

      return res.status(200).json({ success: true, message: "Login Successful", username: user.username, user: userDetails });
  } catch (error) {
      return res.status(500).json({ success: false, message: "Error Logging In", error: error.message });
  }
}

export const logout = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.json({ msg: "User ID is required" });
    }
    
    const user = await User.findById(userId);
    if (!user){
      return res.status(404).json({ msg: "User not found" });
    }

    user.isOnline = false;
    await user.save();
    console.log("User Offline");
    return res.status(200).json({ msg: "User logged out successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Error logging out", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
