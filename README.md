# 📝 Task Manager API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing tasks and users. This API follows clean architecture principles, SOLID design, and is fully ready to be integrated into any frontend or mobile client.

---

## 🚀 Features

- User authentication with JWT
- CRUD operations for tasks
- Task pagination and filtering
- MongoDB with Mongoose
- Environment-based configuration
- Clean architecture (Controllers, Managers, Routes, Models)
- TypeScript + ESLint + Prettier

---

## 📁 Project Structure

```
src/
│
├── config/             # Environment and DB config
├── controllers/        # Route handlers
├── managers/           # Business logic (pagination, etc.)
├── middlewares/        # Auth, error handling, etc.
├── models/             # Mongoose models (User, Task)
├── routes/             # Express routes
├── types/              # Custom TypeScript types
├── utils/              # Utility functions
├── index.ts            # App entry point
```

---

## 🛠️ Technologies

- **Node.js**
- **Express.js**
- **MongoDB Atlas** + Mongoose
- **TypeScript**
- **JWT** (JSON Web Tokens)
- **ESLint + Prettier**
- **Dotenv**

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone git@github.com:ajCamachoR/task-manager-api.git
cd task-manager-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=3000
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
```

4. Start the development server:

```bash
npm run dev
```

---

## 📮 API Endpoints

| Method | Route              | Description               | Auth Required |
| ------ | ------------------ | ------------------------- | ------------- |
| POST   | `/api/auth/signup` | Register new user         | ❌            |
| POST   | `/api/auth/login`  | Login and get token       | ❌            |
| GET    | `/api/tasks`       | Get all tasks (paginated) | ✅            |
| POST   | `/api/tasks`       | Create new task           | ✅            |
| PUT    | `/api/tasks/:id`   | Update task               | ✅            |
| DELETE | `/api/tasks/:id`   | Delete task               | ✅            |

---

## 🧪 Testing

Coming soon (will use Jest + Supertest)

---

## 📌 To Do

- [ ] Add unit and integration tests
- [ ] Add Swagger documentation
- [ ] Add user roles (Admin, Basic)
- [ ] Rate limiting and CORS

---

## 📄 License

MIT

---

## 👩‍💻 Author

**Amanda Camacho**  
GitHub: [@ajCamachoR](https://github.com/ajCamachoR)
