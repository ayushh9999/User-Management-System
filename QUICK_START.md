# Quick Start Guide

This guide will help you get the User Management System up and running quickly.

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js** (version 14 or higher)
  ```bash
  node --version
  ```

- ✅ **npm** (comes with Node.js)
  ```bash
  npm --version
  ```

- ✅ **MongoDB** (version 4.4 or higher)
  ```bash
  mongod --version
  ```

## Quick Setup (5 minutes)

### 1. Clone and Navigate
```bash
git clone https://github.com/ayushh9999/User-Management-System.git
cd User-Management-System
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start MongoDB
**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 4. Run the Application
```bash
npm start
```

### 5. Open Your Browser
Navigate to: `http://localhost:3000`

## First Time Usage

1. **Create Your First User**
   - Go to `http://localhost:3000`
   - Fill in the form with:
     - Name: "John Doe"
     - Email: "john@example.com"
     - Image URL: "https://via.placeholder.com/150"
   - Click "Create User"

2. **View All Users**
   - Click "Read Users" or go to `http://localhost:3000/read`
   - You'll see your newly created user

3. **Edit a User**
   - Click "Edit" on any user card
   - Modify the information
   - Click "Update User"

4. **Delete a User**
   - Click "Delete" on any user card
   - The user will be removed

## Development Mode

For development with auto-restart:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check if port 27017 is available: `netstat -an | grep 27017`

### Port 3000 Already in Use
- Kill the process: `kill -9 $(lsof -ti:3000)`
- Or use a different port: `PORT=3001 npm start`

### Module Not Found Errors
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Next Steps

- Explore the code structure in the main README
- Add your own features
- Contribute to the project

## Need Help?

- Check the main [README.md](../README.md) for detailed documentation
- Open an issue on GitHub for bugs or questions
- Review the [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines

---

🎉 **You're all set! Start creating and managing users.**
