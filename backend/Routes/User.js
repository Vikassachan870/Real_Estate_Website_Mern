const express = require("express");
const router = express.Router();
const User = require("../Modals/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { authenticateToken } = require("../Routes/userauth");
require("dotenv").config();
router.use(express.json());


//registration api
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileno } = req.body;

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    // Check if the user already exists by mobile number
    const existingUsernumber = await User.findOne({ mobileno });
    if (existingUsernumber) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileno,
    });

    // Save the new user to the database
    await newUser.save();
    return res.status(200).json({ message: "Registration successful." });
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Return the actual error message
  }
});

//login api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "No records found!" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      const token = jwt.sign(
        { id: existingUser._id, role: existingUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
      return res.status(200).json({
        id: existingUser._id,
        role: existingUser.role,
        token,
        result: "Success",
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (err) {
    console.error("Error occurred during login:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

//get single user details
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error occurred during fetching profile:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

//update the user profile
router.put("/update", authenticateToken, async (req, res) => {
  try {
    // Find the existing user by the ID from the token
    const existingUser = await User.findById(req.user.id);

    if (existingUser) {
      // Update the user details
      existingUser.firstName = req.body.firstName;
      existingUser.lastName = req.body.lastName;
      existingUser.location = req.body.location;

      await existingUser.save();

      return res.status(200).json({ message: "Update successful." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Return the actual error message
  }
});

//add property to wishlist
router.post("/wishlist", authenticateToken, async (req, res) => {
  try {
    const existing = await User.findById(req.body.userid);
    if (existing) {
      existing.wishlist = req.body.propertyid;
      existing.save();
      return res.status(200).json({ message: "Update successful." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//remove property from wishlist
router.delete("/removewishlist", authenticateToken, async (req, res) => {
  try {
    const existing = await User.findById(req.body.userid);
    if (existing) {
      existing.wishlist.pull(req.body.propertyid);
      await existing.save();

      return res
        .status(200)
        .json({ message: "Property removed from wishlist successfully." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get the wishlisted property id
router.get('/wishlisted/:userId',authenticateToken ,async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and populate the wishlist
    const user = await User.findById(userId).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const propertyInfoList = user.wishlist.map(property => ({
      _id:property._id,
      name: property.name,
      price: property.price,
      location: property.location,
      image: property.images[0] || null, // Handle case where images might be empty
    }));
    // Return the wishlist
    res.json(propertyInfoList);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/forgot-password', async(req, res) => {
  const { email } = req.body;
  const existinguser= await User.findOne({email})
  if (existinguser) {
    const token = crypto.randomBytes(30).toString('hex');
    existinguser.resetToken = token;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aproperties485@gmail.com',
        pass: 'hgiq ebhy asrl qrql',
      },
    });
    const link='http://localhost:5173/reset-password/${token}';
    console.log(token);
    const html = `<b>Hi ${existinguser.firstName},</b>
      <p>You requested to reset your password.</p>
      <p>Please, click the link below to reset your password.</p>
      <a href="${link}">Reset Password</a>`;

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).send('Check your email for instructions on resetting your password');
      }
    });
  } else {
    res.status(404).send('Email not found');
  }
});

router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  if (User.some(User => User.resetToken === token)) {

    res.send('<form method="post" action="/reset-password"><input type="password" name="password" required><input type="submit" value="Reset Password"></form>');
  } else {
    res.status(404).send('Invalid or expired token');
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = User.find(user => user.resetToken === token);

    if (user) {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password with the hashed password
      user.password = hashedPassword;

      delete user.resetToken;

      res.status(200).send('Password updated successfully');
    } else {
      res.status(404).send('Invalid or expired token');
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
