const User = require('../models/upload');
const path = require('path');

const userController = {
  register: async (req, res) => {
    try {
        console.log(req)
      const { name, email } = req.body;
      const avatar = req.file.filename; // Get the path of the uploaded image

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new user instance
      const newUser = new User({
        name,
        email,
        image: path.join(__dirname, '../Images/', avatar),
        // Save the file of the uploaded image
      });

      // Save the new user to the database
      await newUser.save();

      // Return a success response
      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },
  getImage: async (req, res) => {
    try {
      const userEmail = req.params.email; // Assuming you're using email as the identifier
  
      // Retrieve the user from the database based on the email
      const user = await User.findOne({ email: userEmail });
  
      // If user not found, return an error response
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
  
      // Set the Content-Type header based on the image file format
      res.set('Content-Type', 'image/jpeg'); // Adjust the MIME type as per your image format
  
      // Resolve the absolute path of the image file
      const imagePath = path.resolve(user.image);
  
      // Serve the image
      res.sendFile(imagePath);
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },
  
};

module.exports = userController;
