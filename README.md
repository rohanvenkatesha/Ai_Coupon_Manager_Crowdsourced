# 🧠 AI Coupon Manager (Crowdsourced)

A full-stack web application that uses AI to generate, validate, and manage discount coupons — with a modern frontend built in **Next.js** and a backend powered by **FastAPI**, **PostgreSQL**, **SQLAlchemy**, and **OpenAI**.

---

## 📦 Features

- ✨ AI-generated coupon codes via OpenAI
- ✅ Coupon validation using natural language
- 🏪 Store-wise coupon browsing and rating
- 🗃️ PostgreSQL-backed storage
- 🌐 Dockerized development
- 💡 Future-ready AI rating integration

---

## 🧱 Tech Stack

### 🖥️ Frontend
- [Next.js](https://nextjs.org/)
- TypeScript + Tailwind CSS
- API proxying via `next.config.js`

### 🔧 Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- SQLAlchemy ORM + Pydantic
- PostgreSQL (Docker container)
- OpenAI GPT-3 (`text-davinci-003`)
- Docker + dotenv

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rohanvenkatesha/Ai_Coupon_Manager_Crowdsourced.git
cd Ai_Coupon_Manager_Crowdsourced
````

---

## ⚙️ Backend Setup

### 📁 Folder: `/app`

#### 1. Set up `.env`

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/coupons
OPENAI_API_KEY=your-openai-api-key
```

#### 2. Run with Docker

```bash
docker-compose up --build
```

This will:

* Start PostgreSQL
* Start the FastAPI server at `http://localhost:8000`

---

## 💻 Frontend Setup

### 📁 Folder: `/frontend`

#### 1. Install dependencies

```bash
cd frontend
npm install
```

#### 2. Run the app

```bash
npm run dev
```

Frontend will start at `http://localhost:3000`.

---

## 🔁 Proxy Setup (in `next.config.js`)

API routes like `/submit-coupon` are proxied to `http://localhost:8000`:

```ts
rewrites() {
  return [
    { source: '/submit-coupon', destination: 'http://localhost:8000/submit-coupon' },
    { source: '/validate-coupon-ai', destination: 'http://localhost:8000/validate-coupon-ai' },
    { source: '/validate-by-store', destination: 'http://localhost:8000/validate-by-store' },
  ];
}
```

---

## 🧪 Sample Usage

### 🔹 Submit Coupon

* Enter store, discount, and expiry
* Optionally generate a code with AI

### 🔹 Validate Coupon

* Type a code or description (e.g. "coupon for Amazon")
* AI finds the best match

### 🔹 Browse by Store

* View all coupons for a specific store
* Vote on whether a coupon worked

---

## 🧠 AI Integration

* OpenAI is used to:

  * Generate catchy coupon codes
  * Match user input to the best existing coupon
* Uses `text-davinci-003` for reliability

---

## 🧑‍💻 Contributing

Want to add new tools or enhance the AI logic? Open a PR or fork the repo!

---

## 📄 License

MIT License. Use freely and star the repo if you find it helpful!

---
