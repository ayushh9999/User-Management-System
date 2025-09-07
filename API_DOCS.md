# API Documentation

## Overview

The User Management System provides a RESTful API for managing users with full CRUD operations.

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. Get Home Page (Create User Form)

**GET** `/`

Returns the home page with a form to create new users.

**Response:**
- HTML page with user creation form

---

### 2. Get All Users

**GET** `/read`

Retrieves and displays all users in the database.

**Response:**
- HTML page displaying all users in card layout

**Example Response Data:**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/avatar.jpg",
    "createdAt": "2025-09-07T10:30:00.000Z",
    "updatedAt": "2025-09-07T10:30:00.000Z"
  }
]
```

---

### 3. Get Edit User Page

**GET** `/edit/:userid`

Retrieves a specific user and displays the edit form.

**Parameters:**
- `userid` (string, required): The MongoDB ObjectId of the user

**Response:**
- HTML page with pre-filled edit form

**Error Responses:**
- `404 Not Found`: User not found
- `500 Internal Server Error`: Database error

---

### 4. Create New User

**POST** `/create`

Creates a new user in the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/avatar.jpg"
}
```

**Validation Rules:**
- `name`: Required, 2-50 characters, trimmed
- `email`: Required, valid email format, unique, lowercase
- `image`: Required, valid image URL (jpg, jpeg, png, gif, bmp, svg)

**Response:**
- Redirect to `/read` (users list page)

**Error Response:**
- `500 Internal Server Error`: Validation error or database error

---

### 5. Update User

**POST** `/update/:userid`

Updates an existing user's information.

**Parameters:**
- `userid` (string, required): The MongoDB ObjectId of the user

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "image": "https://example.com/new-avatar.jpg"
}
```

**Response:**
- Redirect to `/read` (users list page)

**Error Response:**
- `500 Internal Server Error`: User not found or database error

---

### 6. Delete User

**GET** `/delete/:id`

Deletes a user from the database.

**Parameters:**
- `id` (string, required): The MongoDB ObjectId of the user

**Response:**
- Redirect to `/read` (users list page)

**Error Response:**
- `500 Internal Server Error`: User not found or database error

---

## Data Models

### User Schema

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  image: {
    type: String,
    required: true,
    match: /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg)$/i
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

## Error Handling

All endpoints include proper error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Database or server errors

## Content Types

- **Request**: `application/x-www-form-urlencoded` (HTML forms)
- **Response**: `text/html` (EJS rendered pages)

## Database

- **Type**: MongoDB
- **Database Name**: `testapp1`
- **Collection**: `users`
- **Connection**: `mongodb://localhost:27017/testapp1`

## Security Considerations

- Input validation on all fields
- Email uniqueness enforcement
- URL validation for image fields
- Error message sanitization

## Future Enhancements

- JWT authentication
- Password hashing
- File upload for images
- Pagination for user lists
- Search and filter functionality
- RESTful JSON API endpoints
