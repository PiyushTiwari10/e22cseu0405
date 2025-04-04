# 📊 Average Calculator Microservice

A Node.js microservice built using Express that fetches numbers from a public evaluation service and calculates the rolling average of the last 10 **unique** numbers received.

---

## 🚀 Features

- Fetch numbers from external APIs (prime, even, Fibonacci, random)
- Maintains a unique sliding window of the last 10 numbers
- Calculates the average
- Uses Axios with a 500ms timeout
- Bearer token-based authentication

---

## 🔧 Tech Stack

- Node.js
- Express
- Axios

---

## 🗂️ Project Structure

```
average-calculator/
├── .gitignore
├── .env                 # Your access token lives here
├── index.js             # Main Express server
├── logic.js             # Sliding window logic
├── package.json
├── package-lock.json
└── screenshots/         # API response screenshots
    ├── prime.png
    ├── even.png
    ├── fibo.png
    └── random.png
|--README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/PiyushTiwari10/e22cseu0405.git
cd e22cseu0405/average-calculator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Authentication

Create a `.env` file in the `average-calculator` directory and add your bearer token:

```env
ACCESS_TOKEN=Bearer <your-access-token>
```

### 4. Start the Server

```bash
node index.js
```

> Server will run at `http://localhost:9876`

---

## 🔐 Authentication

This service requires an access token to fetch data from the evaluation API. The token is stored in `.env` and used as a Bearer token in the headers.

---

## 📡 API Endpoints

Each route fetches a different set of numbers:

| Type | Endpoint | Description |
|------|----------|-------------|
| Prime | [`/numbers/p`](http://localhost:9876/numbers/p) | Get prime numbers |
| Even | [`/numbers/e`](http://localhost:9876/numbers/e) | Get even numbers |
| Fibonacci | [`/numbers/f`](http://localhost:9876/numbers/f) | Get Fibonacci numbers |
| Random | [`/numbers/r`](http://localhost:9876/numbers/r) | Get random numbers |

---

## 🧾 Sample JSON Response

```json
{
  "windowPrevState": [/* previous 10 unique numbers */],
  "windowCurrState": [/* current 10 unique numbers */],
  "numbers": [/* newly fetched numbers */],
  "avg": "00.00"
}
```

---

## 🖼️ Screenshots

Each of the endpoints returns a JSON response. Here are screenshots of each (stored in the `screenshots/` folder):

- `screenshots/prime.png`
- `screenshots/even.png`
- `screenshots/fibo.png`
- `screenshots/random.png`

---

## ✅ Notes

- Timeout for API requests is 500ms
- Duplicate numbers are ignored
- If the request fails or times out, the microservice still responds gracefully

---


## 👨‍💻 Author

**Piyush Tiwari**  
GitHub: [@PiyushTiwari10](https://github.com/PiyushTiwari10)
