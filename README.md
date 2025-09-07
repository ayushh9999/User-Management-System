# User Management System

A full-stack web application built with Node.js, Express.js, MongoDB, and EJS for managing users with complete CRUD (Create, Read, Update, Delete) operations.

## 🚀 Features

- **Create Users**: Add new users with name, email, and profile image
- **View All Users**: Display all users in a responsive card layout
- **Update Users**: Edit existing user information
- **Delete Users**: Remove users from the database
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly UI
- **Modern UI**: Dark theme with smooth hover effects

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- npm (comes with Node.js)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushh9999/User-Management-System.git
   cd User-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - The application connects to `mongodb://localhost:27017/testapp1`

4. **Run the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📁 Project Structure

```
User-Management-System/
├── app.js                 # Main application file
├── package.json           # Project dependencies and scripts
├── README.md             # Project documentation
├── models/
│   └── user.js           # User schema and model
├── views/
│   ├── index.ejs         # Create user page
│   ├── read.ejs          # Display all users page
│   └── edit.ejs          # Edit user page
└── public/
    ├── images/           # Static images
    ├── javascripts/      # Client-side JS files
    └── stylesheets/
        └── style.css     # Custom CSS styles
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Render create user page |
| GET | `/read` | Display all users |
| GET | `/edit/:userid` | Render edit user page |
| POST | `/create` | Create a new user |
| POST | `/update/:userid` | Update user information |
| GET | `/delete/:id` | Delete a user |

## 💾 Database Schema

### User Model
```javascript
{
  name: String,     // User's full name
  email: String,    // User's email address
  image: String     // URL to user's profile image
}
```

## 🖥️ Usage

### Creating a User
1. Go to the home page (`/`)
2. Fill in the user's name, email, and image URL
3. Click "Create User"
4. You'll be redirected to the users list

### Viewing Users
1. Click "Read Users" from the navigation
2. View all users in a card layout
3. Each card shows the user's image, name, and email

### Editing a User
1. From the users list, click "Edit" on any user card
2. Modify the user's information
3. Click "Update User" to save changes

### Deleting a User
1. From the users list, click "Delete" on any user card
2. The user will be permanently removed from the database

## 🎨 Styling

The application uses a modern dark theme with:
- **Colors**: Dark zinc background with blue and yellow accents
- **Typography**: Clean, tracking-adjusted fonts
- **Layout**: Flexbox-based responsive design
- **Interactive**: Hover effects on buttons and links

## 🚀 Development

### Running in Development Mode
```bash
# Install nodemon for auto-restart during development
npm install -g nodemon

# Start development server
nodemon app.js
```

### Environment Setup
The application currently uses hardcoded database connection. For production, consider:
- Using environment variables for database URL
- Adding connection error handling
- Implementing data validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Ayush Mondal**
- GitHub: [@ayushh9999](https://github.com/ayushh9999)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the robust database solution
- Tailwind CSS for the utility-first CSS framework
- EJS team for the templating engine

## 📞 Support

If you have any questions or run into issues, please open an issue on this repository.

---

⭐ **Star this repository if you found it helpful!**
