import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
   host: process.env.REDIS_HOST || "redis-19771.c80.us-east-1-2.ec2.redns.redis-cloud.com",
   port: Number(process.env.REDIS_PORT) || 19771,
   password: process.env.REDIS_PASSWORD || "rOIoxagjRef20uMwNNZlHmtc6Y4Dj5J7",
   username: "default",
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;
