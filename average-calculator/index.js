const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ1NTM1LCJpYXQiOjE3NDM3NDUyMzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImFlNWIyMWZiLThmM2YtNGNmNC1hOWE2LTcxYzE3YzZjZWJkMyIsInN1YiI6ImUyMmNzZXUwNDA1QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTA0MDVAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoicGl5dXNoIHRpd2FyaSIsInJvbGxObyI6ImUyMmNzZXUwNDA1IiwiYWNjZXNzQ29kZSI6InJ0Q0haSiIsImNsaWVudElEIjoiYWU1YjIxZmItOGYzZi00Y2Y0LWE5YTYtNzFjMTdjNmNlYmQzIiwiY2xpZW50U2VjcmV0IjoiUXJoVFZOd2dmUHVlaGVKUiJ9.mwZ3HE2etVEtkOwELHEGd_bav7XAK-bCfKqQ_5IL-nI";

const API_MAP = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand"
};

let windowData = [];

const updateWindow = (newNumbers) => {
  for (const num of newNumbers) {
    if (!windowData.includes(num)) {
      if (windowData.length >= WINDOW_SIZE) {
        windowData.shift();
      }
      windowData.push(num);
    }
  }
  return windowData;
};

app.get("/numbers/:type", async (req, res) => {
  const type = req.params.type;
  const endpoint = API_MAP[type];

  if (!endpoint) {
    return res.status(400).json({ error: "Invalid number type" });
  }

  const url = `http://20.244.56.144/evaluation-service/${endpoint}`;
  let numbers = [];

  try {
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => {
      source.cancel("Request took too long (>500ms)");
    }, 500);

    const response = await axios.get(url, {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
      cancelToken: source.token,
    });

    clearTimeout(timeout);
    numbers = response.data.numbers || [];
  } catch (err) {
    console.warn("Error fetching numbers", err.message);
  }

  const windowPrevState = [...windowData];
  const windowCurrState = updateWindow(numbers);
  const avg =
    windowCurrState.reduce((acc, n) => acc + n, 0) / windowCurrState.length || 0;

  res.json({
    windowPrevState,
    windowCurrState,
    numbers,
    avg: avg.toFixed(2),
  });
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
