import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  genre: {
    type: Array<String>,
    trim: true,
  },
  mood: {
    type: Array<String>,
    trim: true,
  },
  theme: {
    type: Array<String>,
    trim: true,
  },
  instrument: {
    type: Array<String>,
    trim: true,
    required: true,
  },
  filePath: {
    // Path to the uploaded music file
    type: String,
    // required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;
