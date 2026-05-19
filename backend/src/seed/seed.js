import dotenv from "dotenv";
import mongoose from "mongoose";
import Place from "../models/Place.js";

dotenv.config();

const data = [
  {
    name: "Kedarnath Temple",
    category: "temples",
    location: "Uttarakhand, India",
    description: "One of the holiest Shiva temples, located in the Himalayas.",
    timing: "6:00 AM - 8:00 PM",
    ticketPrice: "Free",
    bestTimeToVisit: "May - October",
    coordinates: { lat: 30.7346, lng: 79.0669 },
    mapLink: "https://www.google.com/maps?q=Kedarnath+Temple",
    mapEmbed: "https://www.google.com/maps?q=Kedarnath+Temple",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
    ratingAvg: 4.8
  },
  {
    name: "Somnath Temple",
    category: "temples",
    location: "Gujarat, India",
    description: "Famous Jyotirlinga temple on the Arabian Sea coast.",
    timing: "6:00 AM - 9:00 PM",
    ticketPrice: "Free",
    bestTimeToVisit: "October - March",
    coordinates: { lat: 20.888, lng: 70.401 },
    mapLink: "https://www.google.com/maps?q=Somnath+Temple",
    mapEmbed: "https://www.google.com/maps?q=Somnath+Temple",
    image: "https://images.unsplash.com/photo-1558980664-10e7170a066b",
    ratingAvg: 4.7
  },
  {
    name: "Cafe Mocha",
    category: "cafes",
    location: "Pune, India",
    description: "Vibrant cafe with great ambience & coffee.",
    timing: "10:00 AM - 11:00 PM",
    ticketPrice: "₹200-₹600",
    bestTimeToVisit: "Evening",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    mapLink: "https://www.google.com/maps?q=Cafe+Mocha+Pune",
    mapEmbed: "https://www.google.com/maps?q=Cafe+Mocha+Pune",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
    ratingAvg: 4.4
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Place.deleteMany({});
  await Place.insertMany(data);
  console.log("✅ Seed inserted");
  process.exit();
}

seed();
