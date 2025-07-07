import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import Music from "../models/music.model";
import ApiResponse from "../utils/ApiResponse";
// import { uploadOnCloudinary } from "../utils/claudinary";

const uploadMusic = asyncHandler(async (req: Request, res: Response) => {
  console.log("request recieved");
  const { title, artist, album, mood, theme, instrument } = req.body;
  if (!title || !artist) {
    throw new ApiError(400, "Title and artist are required");
  }

  const file = req.file as Express.Multer.File;
  console.log(file);

  // const fileLocalPath = file.path;

  // if (!fileLocalPath) {
  //   throw new ApiError(400, "File not found");
  // }

  // const musicFile = await uploadOnCloudinary(fileLocalPath);

  const newMusic = new Music({
    title,
    artist,
    album,
    mood,
    theme,
    // filePath: musicFile?.url,
    instrument,
  });

  const music = await newMusic.save();
  console.log(music);
  res
    .status(201)
    .json(new ApiResponse(201, "Music uploaded successfully", music));
});

const getAllMusic = asyncHandler(async (_req: Request, res: Response) => {
  console.log("get all music");
  const music = await Music.find();
  res
    .status(200)
    .json(new ApiResponse(200, "Music fetched successfully", music));
});

const getMusicByTitle = asyncHandler(async (req: Request, res: Response) => {
  const music = await Music.findById(req.params.title);
  if (!music) {
    throw new ApiError(404, "Music not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Music fetched successfully", music));
});

export { uploadMusic, getAllMusic, getMusicByTitle };
