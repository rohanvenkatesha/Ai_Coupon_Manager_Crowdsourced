# Coupon Manager Backend

This is the backend service for the Coupon Manager application. It provides APIs to submit coupons, validate coupons, and fetch coupons by store. It also includes optional AI-powered coupon code generation and matching using OpenAI.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup & Installation](#setup--installation)
* [Environment Variables](#environment-variables)
* [Database](#database)
* [API Endpoints](#api-endpoints)
* [Docker](#docker)
* [Future Improvements](#future-improvements)
* [License](#license)

---

## Features

* Submit coupons with store name, code, discount %, and expiration date
* Optionally generate unique coupon codes using OpenAI
* Validate coupon codes (basic and optional AI-based validation)
* Fetch all coupons for a given store
* PostgreSQL database with SQLAlchemy ORM
* Dockerized backend and PostgreSQL database for easy deployment

---

## Tech Stack

* Python 3.11
* FastAPI (for REST API)
* SQLAlchemy (ORM)
* PostgreSQL (Database)
* Uvicorn (ASGI server)
* OpenAI API (optional coupon code generation and validation)
* Docker & Docker Compose

---

## Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Create and activate a virtual environment (optional but recommended)**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables**

   Create a `.env` file in the root directory and add:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/coupons
   OPENAI_API_KEY=your-openai-api-key-here
   ```

5. **Run the application**

   ```bash
   uvicorn main:app --reload
   ```

   The API will be available at: `http://localhost:8000`

---

## Environment Variables

| Variable         | Description                               | Example                                             |
| ---------------- | ----------------------------------------- | --------------------------------------------------- |
| `DATABASE_URL`   | PostgreSQL connection string              | `postgresql://user:password@localhost:5432/coupons` |
| `OPENAI_API_KEY` | OpenAI API key for coupon code generation | `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`                   |

---

## Database

The backend uses PostgreSQL with the following table schema:

### Table: `coupons`

| Column       | Type    | Description                  |
| ------------ | ------- | ---------------------------- |
| `id`         | Integer | Primary key                  |
| `store`      | String  | Store name (indexed)         |
| `code`       | String  | Unique coupon code (indexed) |
| `discount`   | Float   | Discount percentage          |
| `expires_at` | Date    | Coupon expiration date       |

---

## API Endpoints

### 1. Submit Coupon

```
POST /submit-coupon?generate_code=[true|false]
```

**Request Body**

```json
{
  "store": "string",
  "code": "string (optional if generate_code=true)",
  "discount": float,
  "expires_at": "YYYY-MM-DD"
}
```

**Response**

```json
{
  "message": "Coupon added successfully",
  "coupon": "CODE123"
}
```

---

### 2. Validate Coupon (with optional AI matching)

```
GET /validate-coupon-ai?query=COUPONCODE
```

**Response**

* If valid:

```json
{
  "valid": true,
  "code": "CODE123",
  "store": "Store Name",
  "discount": 20.5,
  "expires_at": "YYYY-MM-DD"
}
```

* If invalid or expired:

```json
{
  "valid": false,
  "message": "Coupon expired or not found"
}
```

---

### 3. Get Coupons by Store

```
GET /validate-by-store?store=StoreName
```

**Response**

* If coupons found:

```json
{
  "valid": true,
  "store": "StoreName",
  "coupons": [
    {
      "code": "CODE123",
      "discount": 20.5,
      "expires_at": "YYYY-MM-DD",
      "expired": false
    },
    ...
  ]
}
```

* If no coupons found:

```json
{
  "valid": false,
  "message": "No coupons found for store 'StoreName'"
}
```

---

## Docker

You can run the backend and PostgreSQL using Docker Compose:

```bash
docker-compose up --build
```

* Backend API available on `http://localhost:8000`
* PostgreSQL database runs in `db` container

Make sure to set `OPENAI_API_KEY` in your environment before running Docker Compose if you want AI features.

---

## Future Improvements

* Enable AI-powered coupon code validation (currently disabled)
* Add user authentication & authorization
* Implement detailed coupon usage analytics
* Improve error handling & logging
* Add unit and integration tests

---

