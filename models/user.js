const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/testapp1')
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

// Define user schema with validation
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg)$/i, 'Please enter a valid image URL']
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the User model
module.exports = mongoose.model('User', userSchema);