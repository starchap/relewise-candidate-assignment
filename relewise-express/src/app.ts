import express from "express";

import cors from "cors";
import searchRouter from "./routes/search";
import trackProductViewRouter from "./routes/trackProductView";

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: allowedOrigin,
}));

app.use((_, res, next) => {
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
});

app.use(express.json());

app.use("/search", searchRouter);
app.use("/track-product-view", trackProductViewRouter);

export default app;
