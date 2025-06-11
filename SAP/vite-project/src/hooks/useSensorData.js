import { useEffect, useState } from "react";

const useSensorData = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(data);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socket.close();
  }, []);

  return sensorData;
};

export default useSensorData;
