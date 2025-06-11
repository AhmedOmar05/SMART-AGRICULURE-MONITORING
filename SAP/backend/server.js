import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// WebSocket Server
const wss = new WebSocketServer({ port: 8080 });
console.log("✅ WebSocket Server started on ws://localhost:8080");

// Function to generate dummy sensor data
const generateSensorData = () => {
  return {
    timestamp: new Date().toISOString(),
    sensors: {
      motion: {
        sensor: "PIR",
        detected: Math.random() < 0.5,
      },
      gas: {
        sensor: "MQ-2",
        ppm: Math.floor(Math.random() * 400 + 200), // 200–600 ppm
      },
      soilMoisture: {
        sensor: "YL-69",
        value: Math.floor(Math.random() * 1024),
        status: Math.random() < 0.5 ? "Dry" : "Wet",
      },
      temperatureHumidity: {
        sensor: "DHT11",
        temperature: (Math.random() + 35).toFixed(2),
 // 25–35°C
        humidity: (45).toFixed(2)
 // 50–70%
      },
      rain: {
        sensor: "LM393",
        status: Math.random() < 0.3 ? "Rain Detected" : "No Rain",
      },
      ldr: {
        sensor: "LDR",
        lightLevel: Math.floor(Math.random() * 100), // 0-99 (arbitrary light level)
      },
      airQuality: {
        sensor: "MQ135",
        ppm: Math.floor(Math.random() * 200 + 50), // 50-250 ppm (arbitrary AQI)
        quality: getAirQuality(Math.floor(Math.random() * 200 + 50)),
      },
      pressure: {
        sensor: "PSR",
        pressurekPa: (Math.random() * 5 + 100).toFixed(2), // 100-105 kPa (example range)
      },
    },
  };
};

// Helper function to determine air quality based on MQ135 reading (example)
const getAirQuality = (ppm) => {
  if (ppm > 150) {
    return "Poor";
  } else if (ppm > 100) {
    return "Moderate";
  } else {
    return "Good";
  }
};

// Broadcast dummy data every 2 seconds
setInterval(() => {
  const data = JSON.stringify(generateSensorData());
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
}, 2000);

// Handle client connections
wss.on("connection", (ws) => {
  console.log("📡 Client connected");

  ws.on("message", (message) => {
    console.log("📩 Received:", message);
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Express Server running on http://localhost:${PORT}`)
);