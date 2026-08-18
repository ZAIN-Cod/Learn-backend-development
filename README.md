# 🎬 YouTube Backend Practice for Learning

A production-oriented **backend API for a YouTube-style video-sharing platform**, built using Node.js, Express.js, MongoDB, and Mongoose.

This project focuses on building a scalable REST API with JWT authentication, user management, subscriptions, channel profiles, and advanced MongoDB aggregation pipelines.

## 🚀 Overview

This backend provides the core server-side functionality required for a video-sharing platform.

The project focuses on:

* User authentication
* User profile management
* Channel profiles
* Subscriber management
* Channel subscriptions
* MongoDB relationships
* Protected API routes
* Aggregation pipelines
* Clean and secure API responses

The frontend is **not included** in this repository. This project is currently focused entirely on backend development and API architecture.

## 🛠️ Tech Stack

* **Node.js** — Runtime environment
* **Express.js** — Backend framework
* **MongoDB** — Database
* **Mongoose** — ODM
* **JWT** — Authentication
* **JavaScript** — Programming language
* **Postman** — API testing
* **Git & GitHub** — Version control

## 🏗️ Backend Architecture

```text
Client / Postman
       │
       ▼
   Express API
       │
       ▼
     Routes
       │
       ▼
  Middleware
   └── verifyJWT
       │
       ▼
  Controllers
       │
       ▼
    Models
       │
       ▼
    MongoDB
```

## 🔐 Authentication

The API uses **JWT-based authentication** to protect private routes.

Protected requests require:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

The `verifyJWT` middleware validates the token before allowing access to protected controllers.

## 👤 User Channel Profile

One of the major backend features is the **User Channel Profile API**.

It retrieves:

* User profile information
* Subscriber count
* Channels subscribed to count
* Current user's subscription status

### Endpoint

```http
GET /api/v1/users/c/:username
```

### Example

```http
GET /api/v1/users/c/zain
```

For authenticated requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

## 🧠 MongoDB Aggregation

This project uses MongoDB aggregation pipelines to handle relationships between users and subscriptions.

### `$lookup`

Used to perform JOIN-like operations between MongoDB collections.

```javascript
{
  $lookup: {
    from: "subscriptions",
    localField: "_id",
    foreignField: "channel",
    as: "subscribers"
  }
}
```

### `$addFields`

Used to calculate dynamic values such as subscriber counts.

```javascript
{
  $addFields: {
    subscribersCount: {
      $size: "$subscribers"
    }
  }
}
```

### `$cond`

Used for conditional logic such as determining whether the logged-in user has subscribed to a channel.

### `$project`

Used to control the fields returned by the API and prevent unnecessary data from being exposed.

## 📊 Example Response

```json
{
  "statusCode": 200,
  "data": {
    "username": "zain",
    "fullName": "Zain",
    "avatar": "...",
    "coverImage": "...",
    "subscribersCount": 125,
    "channelsSubscribedToCount": 18,
    "isSubscribed": true
  },
  "message": "User channel fetched successfully"
}
```

## 📁 Project Structure

```text
backend/
│
├── src/
│   ├── controllers/
│   │   └── user.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── subscription.model.js
│   │
│   ├── routes/
│   │   └── user.routes.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Enter the project directory

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

> Never commit your `.env` file or expose secret keys on GitHub.

### 5. Start the development server

```bash
npm run dev
```

## 🧪 API Testing

The backend APIs can be tested using **Postman**.

For protected endpoints:

1. Login and obtain an access token.
2. Add the token to the request.
3. Use the `Authorization` header.
4. Send the request.

```http
Authorization: Bearer <ACCESS_TOKEN>
```

## 📚 Concepts Practiced

This project demonstrates practical backend development concepts including:

* RESTful API development
* Express.js routing
* MVC architecture
* MongoDB
* Mongoose
* JWT authentication
* Middleware
* Protected routes
* MongoDB aggregation
* `$lookup`
* `$addFields`
* `$cond`
* `$project`
* Collection relationships
* API response handling
* Backend security

## 🔮 Future Development

The backend will be expanded with additional video-platform functionality such as:

* [ ] Video upload APIs
* [ ] Video management
* [ ] Likes and dislikes
* [ ] Comments
* [ ] Playlists
* [ ] Watch history
* [ ] Search APIs
* [ ] Subscriptions
* [ ] Notifications
* [ ] Channel analytics
* [ ] Cloudinary integration
* [ ] Production deployment

## 🎯 Project Goal

The goal of this project is to develop a **robust and scalable backend for a YouTube-style application** while gaining practical experience with Node.js, Express.js, MongoDB, Mongoose, authentication, and advanced aggregation pipelines.

## 👨‍💻 Author

**Zain**

Software Engineering Student | Full Stack Web Developer|Expert in Ai automation  for business

---

⭐ If you find this project useful, consider giving the repository a star.
