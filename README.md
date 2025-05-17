
# 🛒 E-commerce Backend project

A robust and scalable E-Commerce Backend built with **Node.js**, **Express**, and **MongoDB**, supporting user authentication, product management, order processing, and **Stripe payments** — designed for full-stack e-commerce applications.

## 🚀 Features

- User registration & login (JWT-based)
- Admin & user role separation
- Product CRUD operations (Admin only)
- Order creation & management
- Stripe checkout integration
- Protected routes with authentication middleware
- Admin dashboard stats (sales, orders, users, products)
- Webhook endpoint to handle Stripe payment confirmation



---

## 🧰 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe
- **Environment Variables**: dotenv

---

## 📁 Project Structure
├── config/

│ └── db.config.js

├── controllers/

├── middleware/

├── models/

├── routes/

├── utils/

├── .env

└── server.js

└── app.js



---

## 🛠️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create .env File**

```javascript
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLIENT_URL=http://localhost:3000
```

4. **Run The Server**


#### For development
```bash
npm run dev
```

#### For production
```bash
npm start
```

## 🔐 API Authentication
- Public Routes: Login, Register, Product listing, Product details

- Protected Routes: Create Orders, View My Orders

- Admin Routes: Product management, View all orders, Admin stats

### Use JWT token in the Authorization header:
``` Authorization: Bearer <token> ```



### 📘 Notes
- Ensure MongoDB and Stripe are properly configured.

- Use tools like Postman to test the endpoints.

- Secure your API keys and never commit secrets to public repositories.

## 👨‍💻 Author

Mehboob Hassan – @Mehboob-Hassan