# 🚗 Rent-a-Car Microservices Project

A full-stack car rental platform built with a microservices architecture using Spring Boot, React, Docker, and modern DevOps tools. This system handles user management, car bookings, payments, authentication, and service discovery.

---

## 📦 Tech Stack

### Backend

* Java 21 + Spring Boot 3.4.4
* MongoDB (User Service)
* PostgreSQL (Booking Service)
* Redis (Temp Booking Store)
* Eureka Service Discovery
* Spring Cloud Gateway
* JWT Authentication

### Frontend

* React + Vite
* Tailwind CSS + Framer Motion
* Axios, React Router, Redux Toolkit

### DevOps / Tools

* Docker & Docker Compose
* Maven
* Postman (API testing)
* VS Code / IntelliJ IDEA

---

## 🧱 Microservices Architecture

```
               +---------------------+
               |   React Frontend    |
               +----------+----------+
                          |
                [Spring Cloud Gateway]
                          |
    +----------+----------+----------+----------+
    |          |          |          |          |
User Service  Booking   Payment   Car Service  Notification
             Service    Service     (Optional)    Service
```

---

## 🧩 Services Overview

### 🌐 API Gateway (`api-gateway`)

* Central entry point for all client requests
* Handles routing, CORS, and JWT security

### 🧍 User Service (`user-service`)

* Handles registration, login, JWT issuance
* Password reset via email
* MongoDB for user storage

### 📅 Booking Service (`booking-service`)

* Handles booking logic: pickup/drop, availability, and reservation
* PostgreSQL for persistent bookings
* Redis for temporary booking flows

### 💳 Payment Service (`payment-service`)

* Simulates or integrates real payment flows
* Confirms payment for active bookings
* Currently a fake payment flow with matching frontend

### 🚗 Car Service *(Planned)*

* Manages car listings, models, features, and images

---

## 📁 Folder Structure

```
root/
│
├── backend/
│   ├── api-gateway/
│   ├── eureka-server/
│   ├── user-service/
│   ├── booking-service/
│   ├── payment-service/
│   └── car-service/ (optional)
│
├── frontend/
│   └── rent-a-car-client/ (React + Vite)
│
├── docker/
│   ├── docker-compose.yml
│   └── .env
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Docker & Docker Compose
* Node.js (for frontend)
* Java 21 & Maven (if running services manually)

### ⚙️ Run with Docker

```bash
# Clone repository
git clone https://github.com/your-username/rent-a-car.git
cd rent-a-car

# Start all services
docker-compose up --build
```

### 🌐 Access Points

| Service          | URL                      |
| ---------------- | ------------------------ |
| Frontend         | `http://localhost:5173/` |
| API Gateway      | `http://localhost:8080/` |
| Eureka Dashboard | `http://localhost:8761/` |
| MongoDB          | `localhost:27017`        |
| PostgreSQL       | `localhost:5432`         |
| Redis            | `localhost:6379`         |

---

## 🔐 Authentication

* JWT-based auth handled in User Service
* Token attached to headers for protected routes
* API Gateway validates token before forwarding request

---

## 📤 Features

* ✅ JWT-based Authentication & Role Management
* ✅ Car Listings & Filtering
* ✅ Real-Time Booking Flow (with Redis temp data)
* ✅ Payment Integration (fake for now)
* ✅ Email Support for Password Reset
* ✅ Microservice Scalability via Docker
* ✅ Clean UI with Responsive Design

---

## ⚙️ Feature Implementations

### 🔐 Authentication & Authorization

* User registration and login with hashed passwords
* JWT generation and validation
* Role-based access control with `ROLE_USER`, `ROLE_ADMIN`

### 📧 Forgot Password Flow

* Email-based reset token generation (UUID)
* Token expiry and validation
* Reset password endpoint with new encrypted password

### 🛒 Booking Workflow

* Multi-step car booking UI (pickup → drop → vehicle → payment)
* Temporary booking state stored in Redis during checkout
* Final booking stored in PostgreSQL after payment confirmation

### 💳 Payment Handling

* Simulated payment gateway using React form
* Payment verification endpoint updates booking status

### 📂 Car Listings (Planned)

* Car cards with image sliders, prices, availability
* Admin CRUD functionality for cars (in future Car Service)

### 📊 Dashboard & Admin Controls (Planned)

* Admin login with dashboard overview
* Metrics: active bookings, payments, cancellations, etc.

---

## 📌 Roadmap

* [ ] Add actual payment gateway (Razorpay/Stripe)
* [ ] Deploy on Kubernetes (optional)
* [ ] Integrate Notification Service (email/SMS)
* [ ] Car Service with admin dashboard
* [ ] Logging & monitoring (ELK/Prometheus)

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🧑‍💻 Author

**Dinesh Gandham**
GitHub: [github.com/DineshGandham](https://github.com/DineshGandham)

---
