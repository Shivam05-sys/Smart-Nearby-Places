import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["cafes", "colleges", "treks", "temples", "waterfalls", "lakes", "parks"]
    },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    // timings
    timing: { type: String, default: "Not Available" },

    // pricing
    ticketPrice: { type: String, default: "Free" },

    // best time
    bestTimeToVisit: { type: String, default: "Anytime" },

    // coords for "Nearby me"
    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },

    // map links
    mapLink: { type: String, default: "" },
    mapEmbed: { type: String, default: "" },

    // image
    image: { type: String, default: "" },

    // google places integration
    googlePlaceId: { type: String, default: "" },

    // rating will be auto-calculated from reviews
    ratingAvg: { type: Number, default: 4.2 },
    ratingCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
