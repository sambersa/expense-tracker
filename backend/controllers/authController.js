const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generating JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation: Checking for missing fields when registering user
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields need to be filled out." });
    }

    try {
        // Checking if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        // Creating the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) {
        return res.status(400).json({message: "All fields need to be filled out."});  
    }
    try {
        const user = await User.findOne({ email }); // FIXED: Added dot and space
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials."});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });       
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error logging in user.", error: err.message});
    }
};

// Getting user info
exports.getUserInfo = async (req, res) => { 
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found. "})
        }

        res.status(200).json(user);
    }   catch (err) {
        res
          .status(500)
          .json({ message: "Error getting user information ", error: err.message});
    }
};