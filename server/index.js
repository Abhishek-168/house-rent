import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));