# Coupon Manager - Frontend

This is the frontend application for the Coupon Manager project, built with **Next.js** and **TypeScript**. It provides a user interface for submitting coupons, validating coupon codes, and viewing coupons by store.

---

## Features

* **Submit Coupon:**
  Allows users to submit new coupons with store name, discount, expiration date, and optionally generate coupon codes using AI.

* **Validate Coupon:**
  Users can enter a coupon code or description to check if it’s valid, expired, or not found.

* **View Coupons by Store:**
  Search coupons by store name to get a list of coupons, their discount, expiration, and user ratings.

* **API Proxy:**
  Uses Next.js rewrites to proxy API calls to the backend FastAPI server running on `localhost:8000`.

---

## Main Files Overview

### `pages/index.tsx`

* The main React component for the homepage.

* Contains three main sections:

  1. **Submit Coupon Form** – Inputs for store, code, discount, expiration date, and option to auto-generate code.
  2. **Validate Coupon Form** – Input for a coupon code or description, submits to `/validate-coupon-ai`.
  3. **Coupons by Store Form** – Input for store name, fetches coupons from `/validate-by-store`.

* Uses React state hooks (`useState`) to manage form inputs and API responses.

* Fetches backend API endpoints through the proxy (e.g., `/submit-coupon`).

* Displays results with basic conditional styling for success and error messages.

### `next.config.ts`

* Configures Next.js to run in **React Strict Mode**.
* Defines rewrites to proxy frontend API requests to backend endpoints on `http://localhost:8000`.
  For example:

  * `/submit-coupon` → `http://localhost:8000/submit-coupon`
  * `/validate-coupon-ai` → `http://localhost:8000/validate-coupon-ai`
  * `/validate-by-store` → `http://localhost:8000/validate-by-store`

This allows the frontend to call backend APIs seamlessly during development without CORS issues.

---

## Getting Started

### Prerequisites

* Node.js and npm installed on your machine.
* Backend API running locally on `http://localhost:8000`.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## Usage

1. **Submit Coupon:**
   Fill the form with store name, discount, expiration date, and optionally a coupon code or toggle "Generate Coupon Code with AI". Submit to add a coupon.

2. **Validate Coupon:**
   Enter a coupon code or description and click "Validate Coupon" to check its validity.

3. **Coupons by Store:**
   Enter a store name and click "Get Coupons" to list all coupons related to that store.

---

## Notes

* The AI-based coupon code generation and validation rely on the backend OpenAI integration, so the backend must have a valid OpenAI API key configured.
* The frontend proxy setup expects the backend FastAPI server to run on port `8000`.
* User ratings and AI ratings in the coupon list are placeholders; ratings logic can be enhanced later.
