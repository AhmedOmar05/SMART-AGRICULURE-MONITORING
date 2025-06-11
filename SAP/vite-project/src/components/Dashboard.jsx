import React, { useEffect, useState } from "react";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setData(parsedData);

            // Append latest reading to chartData
            setChartData(prev => [
                ...prev.slice(-9), // keep only last 10 readings
                {
                    time: new Date(parsedData.timestamp).toLocaleTimeString(),
                    temperature: parsedData.sensors.temperatureHumidity.temperature,
                    humidity: parsedData.sensors.temperatureHumidity.humidity,
                    gas: parsedData.sensors.gas.ppm,
                }
            ]);
        };

        return () => ws.close();
    }, []);

    if (!data) return <div className="text-center mt-10 text-xl">Loading sensor data...</div>;

    const { sensors, timestamp } = data;

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-purple-900 via-blue-800 to-black text-white">
            <h1 className="text-3xl font-bold mb-4 text-center">🌱 Smart Agriculture Dashboard</h1>
            <p className="text-sm text-center mb-6">Last updated: {new Date(timestamp).toLocaleString()}</p>

            {/* CHART SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/10 p-4 rounded-xl">
                    <h2 className="text-white font-semibold mb-2">🌡 Temperature & Humidity</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="temperature" stroke="#FF6B6B" />
                            <Line type="monotone" dataKey="humidity" stroke="#4FC3F7" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                    <h2 className="text-white font-semibold mb-2">💨 Gas Levels (PPM)</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="gas" fill="#90EE90" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ORIGINAL CARDS */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                <Card title="Motion Sensor (PIR)" value={sensors.motion.detected ? "Motion Detected" : "No Motion"} />
                <Card title="Gas Sensor (MQ-2)" value={`${sensors.gas.ppm} ppm`} />
                <Card title="Soil Moisture (YL-69)" value={`${sensors.soilMoisture.value} (${sensors.soilMoisture.status})`} />
                <Card title="Temperature (DHT11)" value={`${sensors.temperatureHumidity.temperature} °C`} />
                <Card title="Humidity (DHT11)" value={`${sensors.temperatureHumidity.humidity} %`} />
                {sensors.accelerometer && (<>
                    <Card title="Accelerometer (MPU6050)" value={`x: ${sensors.accelerometer.acceleration.x}, y: ${sensors.accelerometer.acceleration.y}, z: ${sensors.accelerometer.acceleration.z}`} />
                    <Card title="Gyroscope (MPU6050)" value={`x: ${sensors.accelerometer.gyroscope.x}, y: ${sensors.accelerometer.gyroscope.y}, z: ${sensors.accelerometer.gyroscope.z}`} />
                </>)}
                <Card title="Rain Sensor (LM393)" value={sensors.rain.status} />
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/20 hover:scale-105 transition-transform duration-300">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default Dashboard;
