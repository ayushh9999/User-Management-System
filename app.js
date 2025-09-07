
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

// Configuration
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route - renders the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Read route - fetches all users and renders the 'read' page
app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find();
        res.render('read', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Edit route - fetches a single user by ID and renders the 'edit' page
app.get('/edit/:userid', async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.userid });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit', { user });
    } catch (error) {
        console.error('Error fetching user for edit:', error);
        res.status(500).send('Error fetching user');
    }
});

// Update route - updates a user's details and redirects to the 'read' page
app.post('/update/:userid', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModel.findOneAndUpdate(
            { _id: req.params.userid },
            { name, email, image },
            { new: true }
        );
        res.redirect('/read');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
});

// Delete route - deletes a user by ID and redirects to the 'read' page
app.get('/delete/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.redirect('/read');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

// Create route - creates a new user and redirects to the 'read' page
app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModel.create({ name, email, image });
        res.redirect('/read');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Create users at: http://localhost:${PORT}`);
    console.log(`👥 View all users at: http://localhost:${PORT}/read`);
});